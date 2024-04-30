import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from './admin.service';

describe('AdminController', () => {
    let controller: AdminController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AdminController],
            providers: [JwtService, AdminService],
        }).compile();

        controller = module.get<AdminController>(AdminController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
