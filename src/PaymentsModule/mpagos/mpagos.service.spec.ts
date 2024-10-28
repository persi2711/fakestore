import { Test, TestingModule } from '@nestjs/testing';
import { MpagosService } from './mpagos.service';

describe('MpagosService', () => {
  let service: MpagosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MpagosService],
    }).compile();

    service = module.get<MpagosService>(MpagosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
