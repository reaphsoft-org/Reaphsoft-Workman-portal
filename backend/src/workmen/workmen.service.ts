import {
    BadRequestException,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { AppDataSource } from '../data-source';
import { Service } from '../entities/Service';
import { Workman } from '../entities/Workman';
import { ServiceRequestDto } from './dto/service-request.dto';
import { User } from '../entities/User';
import { EstateManager } from '../entities/EstateManager';
import { EstateRequest, UserRequest } from '../entities/Request';
import { RatingDto } from './dto/rating.dto';
import { ClientRating, WorkmanRating } from '../entities/rating';
import { IsNull, Not } from 'typeorm';
import { Messenger } from '../utilities/messenger';

@Injectable()
export class WorkmenService {
    private readonly serviceRepo = AppDataSource.getRepository(Service);
    private readonly workersRepo = AppDataSource.getRepository(Workman);
    private readonly userRepo = AppDataSource.getRepository(User);
    private readonly managerRepo = AppDataSource.getRepository(EstateManager);
    private readonly userRequestRepo = AppDataSource.getRepository(UserRequest);
    private readonly estateRequestRepo =
        AppDataSource.getRepository(EstateRequest);
    private readonly ratingRepo = AppDataSource.getRepository(ClientRating);

    private readonly messenger = new Messenger();

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
        let requestId: number;
        if (type == User.accountType) {
            client = await this.userRepo.findOneBy({
                email: email,
            });
            const request = new UserRequest();
            request.date_required = dto.date;
            request.worker = worker;
            request.client = client!;
            await this.userRequestRepo.save(request);
            requestId = request.id;
        } else {
            client = await this.managerRepo.findOneBy({
                email: email,
            });
            const request = new EstateRequest();
            request.date_required = dto.date;
            request.worker = worker;
            request.client = client!;
            await this.estateRequestRepo.save(request);
            requestId = request.id;
        }
        // if (!client)
        //     return { resp: `user "${email}" not found`, status: false };
        if (worker.registrationToken) {
            await this.messenger.sendMessage(
                worker.registrationToken,
                {
                    id: requestId.toString(),
                },
                `You have a work request scheduled for ${dto.date}\n\nPlease tap to open the app and accept (or decline) this work request.`,
            );
        }
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
                          client_rating: true,
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
                          client_rating: true,
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
                stars:
                    request.client_rating !== null
                        ? request.client_rating.stars
                        : 0,
                comment:
                    request.client_rating !== null
                        ? request.client_rating.comment
                        : '',
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
                          worker: {
                              service: true,
                          },
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

    async addClientRating(
        email: string,
        type: number,
        id: number,
        dto: RatingDto,
    ) {
        const request: UserRequest | EstateRequest | null =
            type == User.accountType
                ? await this.userRequestRepo.findOne({
                      where: {
                          client: {
                              email: email,
                          },
                          id: id,
                      },
                  })
                : await this.estateRequestRepo.findOne({
                      where: {
                          client: {
                              email: email,
                          },
                          id: id,
                      },
                  });
        if (!request) return { status: false, resp: 'request not found' };
        const stars = Number(dto.stars);
        if (stars < 1 || stars > 5)
            return { status: false, resp: 'stars should be between 1 & 5' };
        if (dto.comment === '')
            return { status: false, resp: 'please write a comment' };
        if (request.date_completed)
            return { status: false, resp: 'request has been completed' };
        const clientRating = new ClientRating();
        clientRating.stars = stars;
        clientRating.comment = dto.comment;
        request.client_rating = await this.ratingRepo.save(clientRating);
        request.date_completed = new Date();
        if (type == User.accountType) {
            await this.userRequestRepo.save(request);
        } else {
            await this.estateRequestRepo.save(request);
        }
        return { status: true, resp: '' };
    }

    async getOverviewRatings(workerId: number) {
        const topTwoUserRequestsRating = await this.userRequestRepo.find({
            select: {
                client_rating: {
                    stars: true,
                    comment: true,
                },
            },
            where: {
                worker: {
                    id: workerId,
                },
                client_rating: Not(IsNull()),
            },
            relations: {
                client_rating: true,
            },
            take: 2,
            order: {
                client_rating: {
                    stars: 'DESC',
                },
            },
        });
        const bottomTwoUserRequestsRating = await this.userRequestRepo.find({
            select: {
                client_rating: {
                    stars: true,
                    comment: true,
                },
            },
            where: {
                worker: {
                    id: workerId,
                },
                client_rating: Not(IsNull()),
            },
            relations: {
                client_rating: true,
            },
            take: 2,
            order: {
                client_rating: {
                    stars: 'ASC',
                },
            },
        });
        const topTwoEstateRequestsRating = await this.estateRequestRepo.find({
            select: {
                client_rating: {
                    stars: true,
                    comment: true,
                },
            },
            where: {
                worker: {
                    id: workerId,
                },
                client_rating: Not(IsNull()),
            },
            relations: {
                client_rating: true,
            },
            take: 2,
            order: {
                client_rating: {
                    stars: 'DESC',
                },
            },
        });
        const bottomTwoEstateRequestsRating = await this.estateRequestRepo.find(
            {
                select: {
                    client_rating: {
                        stars: true,
                        comment: true,
                    },
                },
                where: {
                    worker: {
                        id: workerId,
                    },
                    client_rating: Not(IsNull()),
                },
                relations: {
                    client_rating: true,
                },
                take: 2,
                order: {
                    client_rating: {
                        stars: 'ASC',
                    },
                },
            },
        );
        const res: { stars: number; comment: string }[] = [];
        res.push(
            ...topTwoUserRequestsRating.map((r) => ({
                stars: r.client_rating.stars,
                comment: r.client_rating.comment,
            })),
        );
        res.push(
            ...bottomTwoUserRequestsRating.map((r) => ({
                stars: r.client_rating.stars,
                comment: r.client_rating.comment,
            })),
        );
        res.push(
            ...topTwoEstateRequestsRating.map((r) => ({
                stars: r.client_rating.stars,
                comment: r.client_rating.comment,
            })),
        );

        res.push(
            ...bottomTwoEstateRequestsRating.map((r) => ({
                stars: r.client_rating.stars,
                comment: r.client_rating.comment,
            })),
        );
        const uniqueRes: { stars: number; comment: string }[] = [
            ...new Set(res.map((a) => JSON.stringify(a))),
        ].map((a) => JSON.parse(a));
        uniqueRes.sort((a, b) => b.stars - a.stars);
        return uniqueRes;
    }

    async addWorkmanRating(
        email: string,
        type: number,
        id: number,
        dto: RatingDto,
        beforePhoto: Express.Multer.File,
        afterPhoto: Express.Multer.File,
    ) {
        const request: UserRequest | EstateRequest | null =
            type == User.accountType
                ? await this.userRequestRepo.findOne({
                      relations: {
                          worker: true,
                          worker_rating: true,
                      },
                      where: {
                          worker: {
                              email: email,
                          },
                          id: id,
                      },
                  })
                : await this.estateRequestRepo.findOne({
                      relations: {
                          worker: true,
                          worker_rating: true,
                      },
                      where: {
                          worker: {
                              email: email,
                          },
                          id: id,
                      },
                  });
        if (!request) {
            throw new BadRequestException(
                `Work request not found. Error Code: ${id}-${type}`,
            );
        }
        const stars = Number(dto.stars);
        if (stars < 1 || stars > 5) {
            throw new BadRequestException('Stars should be between 1 and 5.');
        }
        if (dto.comment === '') {
            throw new BadRequestException('Please write a comment.');
        }
        if (request.worker_rating !== null) {
            throw new ForbiddenException(
                'You have already submitted a review.',
            );
        }
        const workmanRating = new WorkmanRating();
        workmanRating.stars = stars;
        workmanRating.comment = dto.comment;
        request.worker_rating = await this.ratingRepo.save(workmanRating);
        await request.uploadPhoto(beforePhoto);
        await request.uploadPhoto(afterPhoto, false);
        if (type == User.accountType) {
            await this.userRequestRepo.save(request);
        } else {
            await this.estateRequestRepo.save(request);
        }
        return { status: true, resp: '' };
    }
}
