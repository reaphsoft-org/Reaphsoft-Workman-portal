import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../data-source';
import { Service } from '../entities/Service';

@Injectable()
export class WorkmenService {
    private readonly serviceRepo = AppDataSource.getRepository(Service);

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
}
