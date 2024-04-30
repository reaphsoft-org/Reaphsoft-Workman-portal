import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { JwtService } from '@nestjs/jwt';

describe('AccountsController', () => {
    let controller: AccountsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AccountsController],
            providers: [AccountsService, JwtService],
        }).compile();

        controller = module.get<AccountsController>(AccountsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
