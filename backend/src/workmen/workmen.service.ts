import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../data-source';
import { Service } from '../entities/Service';
import { Workman } from '../entities/Workman';
import { ServiceRequestDto } from './dto/service-request.dto';
import { User } from '../entities/User';
import { EstateManager } from '../entities/EstateManager';
import { EstateRequest, UserRequest } from '../entities/Request';

@Injectable()
export class WorkmenService {
    private readonly serviceRepo = AppDataSource.getRepository(Service);
    private readonly workersRepo = AppDataSource.getRepository(Workman);
    private readonly userRepo = AppDataSource.getRepository(User);
    private readonly managerRepo = AppDataSource.getRepository(EstateManager);
    private readonly userRequestRepo = AppDataSource.getRepository(UserRequest);
    private readonly estateRequestRepo =
        AppDataSource.getRepository(EstateRequest);

    async getServices() {
        const services = await this.serviceRepo.find({
            cache: 60000,
        });
        return services.map((service) => ({
            id: service.id,
            name: service.name,
            description: service.description,
        }));
    }

    async getWorkersForService(id: number, name: string) {
        const workers = await this.workersRepo.find({
            select: {
                id: true,
                fullname: true,
                availability: true,
            },
            where: {
                service: {
                    id: id,
                    name: name,
                },
            },
        });
        return {
            data: workers.map((workman) => ({
                id: workman.id,
                fullname: workman.fullname,
                availability: workman.availability,
            })),
            resp: '',
            status: true,
        };
    }

    async createServiceRequest(
        email: string,
        type: number,
        dto: ServiceRequestDto,
    ) {
        const worker = await this.workersRepo.findOneBy({
            id: dto.workerID,
            fullname: dto.workerName,
        });
        if (!worker) return { resp: 'worker not found', status: false };

        let client: User | EstateManager | null;
        if (type == User.accountType) {
            client = await this.userRepo.findOneBy({
                email: email,
            });
            const request = new UserRequest();
            request.date_required = dto.date;
            request.worker = worker;
            request.client = client!;
            await this.userRequestRepo.save(request);
        } else {
            client = await this.managerRepo.findOneBy({
                email: email,
            });
            const request = new EstateRequest();
            request.date_required = dto.date;
            request.worker = worker;
            request.client = client!;
            await this.estateRequestRepo.save(request);
        }
        // if (!client)
        //     return { resp: `user "${email}" not found`, status: false };
        return { resp: '', status: true };
    }

    async getServiceRequest(id: number, email: string, type: number) {
        const request: UserRequest | EstateRequest | null =
            type == User.accountType
                ? await this.userRequestRepo.findOne({
                      where: {
                          client: {
                              email: email,
                          },
                          id: id,
                      },
                      relations: {
                          worker: true,
                      },
                  })
                : await this.estateRequestRepo.findOne({
                      where: {
                          client: {
                              email: email,
                          },
                          id: id,
                      },
                      relations: {
                          worker: true,
                      },
                  });
        if (!request)
            return { status: false, resp: 'request not found', data: null };
        return {
            status: true,
            resp: '',
            data: {
                accepted: request.accepted,
                date_required: request.date_required,
                date_created: request.date_created,
                date_accepted: request.date_accepted,
                date_completed: request.date_completed,
                worker: request.worker.fullname,
            },
        };
    }

    async getRequestedServices(email: string, type: number, recent: boolean) {
        const requests: UserRequest[] | EstateRequest[] =
            type == User.accountType
                ? await this.userRequestRepo.find({
                      where: {
                          client: {
                              email: email,
                          },
                      },
                      relations: {
                          worker: true,
                      },
                      take: recent ? 5 : undefined,
                  })
                : await this.estateRequestRepo.find({
                      where: {
                          client: {
                              email: email,
                          },
                      },
                      relations: {
                          worker: {
                              service: true,
                          },
                      },
                      take: recent ? 5 : undefined,
                  });
        return requests.map((request) => ({
            id: request.id,
            accepted: request.accepted,
            date_created: request.date_created,
            worker: request.worker.service.name,
        }));
    }
}
