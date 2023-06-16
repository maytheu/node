import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';

describe('PlanetsService', () => {
  let service: PlanetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanetsService],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return >7 habitable planets', async () => {
    const data = await service.loadKeplerData();
    expect(data.length).toBeGreaterThan(7);
  });
});
