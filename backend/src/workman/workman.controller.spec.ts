import { Test, TestingModule } from '@nestjs/testing';
import { WorkmanController } from './workman.controller';

describe('WorkmanController', () => {
  let controller: WorkmanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkmanController],
    }).compile();

    controller = module.get<WorkmanController>(WorkmanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
