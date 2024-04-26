import { Test, TestingModule } from '@nestjs/testing';
import { EstateService } from './estate.service';
import { AppDataSource } from '../data-source';
import { EstateManager } from '../entities/EstateManager';
import { House } from '../entities/House';
import { HouseDto } from './dto/house.dto';

describe('EstateService', () => {
    let service: EstateService;
    const managerRepo = AppDataSource.getRepository(EstateManager);
    const houseRepo = AppDataSource.getRepository(House);
    let manager: EstateManager;
    let house: House;
    const plainPassword = 'plainTextPassword';

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EstateService],
        }).compile();

        service = module.get<EstateService>(EstateService);

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize().catch((e) => {
                console.log(e);
            });
        }

        manager = new EstateManager();
        manager.initialize(
            'manager@reaphsoft-workman.com',
            'Estate Manager',
            plainPassword,
            '',
            '62 Noah Avenue',
            1,
            'Bells Estate',
        );
        await managerRepo.save(manager);

        house = new House();
        house.name = 'kahlflekzy';
        house.number = '15A';
        house.manager = manager;
        await houseRepo.save(house);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should addHouse', async () => {
        const dto = new HouseDto();
        dto.number = '16 B';
        dto.occupant_name = 'Kahl Flekzy';
        const resp = await service.addHouse(manager.email, dto);
        expect(resp.status).toBe(true);
        const uuid = resp.resp;
        expect(uuid).toBeTruthy();
        expect(uuid.length).toBe(36);
        const house = await houseRepo.findOne({
            where: { id: uuid },
            relations: { manager: true },
        });
        expect(house!.number).toBe(dto.number);
        expect(house!.name).toBe(dto.occupant_name);
        expect(house!.manager).toEqual(manager);
    });

    it('should not create a house', async () => {
        const dto = new HouseDto();
        dto.number = '12';
        dto.occupant_name = 'Cool';
        const email = 'invalid@reaphsoft-workman.com';
        const resp = await service.addHouse(email, dto);
        expect(resp.status).toBe(false);
        expect(resp.resp).toBe(`manager '${email}' not found`);
    });

    it('should return a false status (invalid name)', async () => {
        const dto = new HouseDto();
        dto.number = '';
        dto.occupant_name = '';
        const resp = await service.addHouse(manager.email, dto);
        expect(resp.status).toBe(false);
        expect(resp.resp).toBe('invalid occupant name');
    });

    it('should return a false status (invalid house number)', async () => {
        const dto = new HouseDto();
        dto.occupant_name = 'occupant ';
        dto.number = '';
        const resp = await service.addHouse(manager.email, dto);
        expect(resp.status).toBe(false);
        expect(resp.resp).toBe('invalid house number');
    });

    it('should not update house (house exists, invalid manager)', async () => {
        const dto = new HouseDto();
        dto.occupant_name = 'occupant ';
        dto.number = house.number;
        const resp = await service.updateHouse('invalid email', house.id, dto);
        expect(resp.status).toBe(false);
        expect(resp.resp).toBe('house not found');
    });

    it('should not update house (house invalid, manager exists)', async () => {
        const dto = new HouseDto();
        dto.occupant_name = 'occupant ';
        dto.number = house.number;
        const resp = await service.updateHouse(
            manager.email,
            'ea491d1e-a668-46cd-8949-8ab9beeba5e4',
            dto,
        );
        expect(resp.status).toBe(false);
        expect(resp.resp).toBe('house not found');
    });

    it('update: should return a false status (invalid name)', async () => {
        const dto = new HouseDto();
        dto.number = '';
        dto.occupant_name = '';
        const resp = await service.updateHouse(manager.email, house.id, dto);
        expect(resp.status).toBe(false);
        expect(resp.resp).toBe('invalid occupant name');
    });

    it('update: should return a false status (invalid house number)', async () => {
        const dto = new HouseDto();
        dto.occupant_name = 'occupant ';
        dto.number = '';
        const resp = await service.updateHouse(manager.email, house.id, dto);
        expect(resp.status).toBe(false);
        expect(resp.resp).toBe('invalid house number');
    });

    it('should update house', async () => {
        const dto = new HouseDto();
        dto.occupant_name = 'occupant';
        dto.number = 'new number';
        const resp = await service.updateHouse(manager.email, house.id, dto);
        expect(resp.status).toBe(true);
        expect(resp.resp).toBeFalsy();
        const house1 = await houseRepo.findOneBy({ id: house.id });
        expect(house1!.id).toBe(house.id);
        expect(house1?.name).toBe(dto.occupant_name);
        expect(house1?.number).toBe(dto.number);
        // revert for subsequent tests
        await houseRepo.save(house);
    });

    it('should not get house (invalid manager)', async () => {
        const resp = await service.getHouse('invalid@test.com', house.id);
        expect(resp.status).toBe(false);
        expect(resp.resp).toBe('house not found');
    });

    it('should not get house (invalid house)', async () => {
        const resp = await service.getHouse(
            manager.email,
            'ea491d1e-a668-46cd-8949-8ab9beeba5e4',
        );
        expect(resp.status).toBe(false);
        expect(resp.resp).toBe('house not found');
        expect(resp.data).toBeFalsy();
    });

    it('should get house', async () => {
        const resp = await service.getHouse(manager.email, house.id);
        expect(resp.status).toBe(true);
        expect(resp.resp).toBe('');
        expect(resp.data).toEqual({ number: house.number, name: house.name });
    });

    it('should not delete house (invalid manager)', async () => {
        const resp = await service.deleteHouse('invalid@test.com', house.id);
        expect(resp.status).toBe(false);
        expect(resp.resp).toBe('house not found');
    });

    it('should not delete house (invalid house)', async () => {
        const resp = await service.deleteHouse(
            manager.email,
            'ea491d1e-a668-46cd-8949-8ab9beeba5e4',
        );
        expect(resp.status).toBe(false);
        expect(resp.resp).toBe('house not found');
    });

    it('should delete house', async () => {
        const resp = await service.deleteHouse(manager.email, house.id);
        expect(resp.status).toBe(true);
        expect(resp.resp).toBe('');
        const house1 = await houseRepo.findOneBy({ id: house.id });
        expect(house1).toBe(null);
    });

    it('should return an empty array for invalid manager', async () => {
        const resp = await service.getHouses('invalid@test.com', 1);
        expect(resp.data).toEqual([]);
        expect(resp.pages).toBe(0);
    });

    it('should return an empty array for page 0', async () => {
        const resp = await service.getHouses(manager.email, 0);
        expect(resp.data).toEqual([]);
        expect(resp.pages).toBe(0);
    });

    it('should return empty (page range out)', async () => {
        const house0 = new House();
        house0.name = 'kahlflekzy';
        house0.number = '15A';
        house0.manager = manager;
        await houseRepo.save(house0);
        const resp = await service.getHouses(manager.email, 2);
        expect(resp.data).toEqual([]);
        // if delete is skipped this would be 1
        expect(resp.pages).toBeLessThanOrEqual(1);
    });

    it('should return at most 50 houses', async () => {
        const houses: House[] = [];
        for (let i = 0; i < 150; i++) {
            const h = new House();
            h.name = `kahflekzy ${i}`;
            h.number = `${i}`;
            h.manager = manager;
            houses.push(h);
        }
        await houseRepo.save(houses);
        const resp = await service.getHouses(manager.email, 1);
        const data = resp.data;
        expect(data.length).toBe(50);
        expect(resp.pages).toBeGreaterThanOrEqual(3);
        // sorted
        expect(data[0].number).toBe('0');
    });
});
