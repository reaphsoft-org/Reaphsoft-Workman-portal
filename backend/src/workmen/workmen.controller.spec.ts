import { Test, TestingModule } from '@nestjs/testing';
import { WorkmenController } from './workmen.controller';
import { JwtService } from '@nestjs/jwt';
import { WorkmenService } from './workmen.service';

describe('WorkmenController', () => {
    let controller: WorkmenController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WorkmenController],
            providers: [JwtService, WorkmenService],
        }).compile();

        controller = module.get<WorkmenController>(WorkmenController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
