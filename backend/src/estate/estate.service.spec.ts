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
});
