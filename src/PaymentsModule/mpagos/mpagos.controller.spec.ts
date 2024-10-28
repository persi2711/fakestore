import { Test, TestingModule } from '@nestjs/testing';
import { MpagosController } from './mpagos.controller';
import { MpagosService } from './mpagos.service';

describe('MpagosController', () => {
  let controller: MpagosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MpagosController],
      providers: [MpagosService],
    }).compile();

    controller = module.get<MpagosController>(MpagosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
