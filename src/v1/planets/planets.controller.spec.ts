import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { INestApplication } from '@nestjs/common';
import { PlanetsModule } from './planets.module';

describe('PlanetsController', () => {
  let controller: PlanetsController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetsController],
      providers: [PlanetsService],
      imports: [PlanetsModule],
    }).compile();

    controller = module.get<PlanetsController>(PlanetsController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/Get all planets`', async () => {
    await request(app.getHttpServer()).get('/v1/planets').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
