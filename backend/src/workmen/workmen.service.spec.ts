import { Test, TestingModule } from '@nestjs/testing';
import { WorkmenService } from './workmen.service';

describe('WorkmenService', () => {
    let service: WorkmenService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WorkmenService],
        }).compile();

        service = module.get<WorkmenService>(WorkmenService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
