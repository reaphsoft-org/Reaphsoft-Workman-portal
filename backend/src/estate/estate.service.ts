import { Injectable } from '@nestjs/common';
import { HouseDto } from './dto/house.dto';
import { AppDataSource } from '../data-source';
import { House } from '../entities/House';
import { EstateManager } from '../entities/EstateManager';

@Injectable()
export class EstateService {
    private readonly houseRepo = AppDataSource.getRepository(House);
    async addHouse(email: string, dto: HouseDto, admin: boolean = false) {
        const userRepo = AppDataSource.getRepository(EstateManager);
        const manager = await userRepo.findOneBy({ email: email });
        if (!manager)
            return { status: false, resp: `manager '${email}' not found` };
        const check = this.validateCreateDto(dto);
        if (!check.status) return check;
        const house = new House();
        house.manager = manager!;
        house.number = dto.number;
        house.name = dto.occupant_name;
        if (admin) house.vacant = dto.vacancy;
        await this.houseRepo.save(house);
        return { status: true, resp: house.id };
    }

    validateCreateDto(dto: HouseDto) {
        if (dto.occupant_name == undefined || dto.occupant_name == '')
            return { status: false, resp: 'invalid occupant name' };
        if (dto.number == undefined || dto.number == '')
            return { status: false, resp: 'invalid house number' };
        return { status: true, resp: '' };
    }

    async updateHouse(email: string, id: string, dto: HouseDto) {
        const house = await this.houseRepo.findOneBy({
            manager: { email: email },
            id: id,
        });
        if (!house) return { status: false, resp: 'house not found' };
        const check = this.validateCreateDto(dto);
        if (!check.status) return check;
        house.number = dto.number;
        house.name = dto.occupant_name;
        await this.houseRepo.save(house);
        return { status: true, resp: '' };
    }

    async getHouse(email: string, id: string) {
        const house = await this.houseRepo.findOneBy({
            manager: { email: email },
            id: id,
        });
        if (!house)
            return { status: false, resp: 'house not found', data: null };
        return {
            status: true,
            resp: '',
            data: { number: house.number, name: house.name },
        };
    }

    async deleteHouse(email: string, id: string) {
        const house = await this.houseRepo.findOneBy({
            manager: { email: email },
            id: id,
        });
        if (!house) return { status: false, resp: 'house not found' };
        await this.houseRepo.remove(house);
        return { status: true, resp: '' };
    }

    // Return number of pages and the houses in the required page
    // Houses are paginated with 50 in each page and sorted by name.
    // Page should start from 1.
    async getHouses(email: string, page: number, admin: boolean = false) {
        if (page <= 0) return { pages: 0, data: [] };
        const start = 50 * (page - 1);
        const end = 50;
        const houses = await this.houseRepo.find({
            where: {
                manager: {
                    email: email,
                },
            },
            skip: start,
            take: end,
            order: {
                name: 'ASC',
            },
        });
        if (houses.length == 0) return { pages: 0, data: [] };
        // in the future, maybe consider using entityManager.query to run
        // import { getManager } from 'typeorm';
        // const entityManager = getManager();
        // a single query than two (1 for objects another for count)
        const count = await this.houseRepo.count();
        let pages = Math.floor(count / 50);
        pages += count % 50 > 0 ? 1 : 0;
        const data = admin
            ? houses.map((house) => ({
                  id: house.id,
                  number: house.number,
                  name: house.name,
                  vacancy: house.vacant,
              }))
            : houses.map((house) => ({
                  id: house.id,
                  number: house.number,
                  name: house.name,
              }));
        return {
            pages: pages,
            data: data,
        };
    }
}
