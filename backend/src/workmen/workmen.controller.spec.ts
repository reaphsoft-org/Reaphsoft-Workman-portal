import { Test, TestingModule } from '@nestjs/testing';
import { WorkmenController } from './workmen.controller';

describe('WorkmenController', () => {
  let controller: WorkmenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkmenController],
    }).compile();

    controller = module.get<WorkmenController>(WorkmenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
