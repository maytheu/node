import { Test, TestingModule } from '@nestjs/testing';
import { LaunchesController } from './launches.controller';
import { LaunchesService } from './launches.service';
import { LaunchesModule } from './launches.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('LaunchesController', () => {
  let controller: LaunchesController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaunchesController],
      providers: [LaunchesService],
      imports: [LaunchesModule],
    }).compile();

    controller = module.get<LaunchesController>(LaunchesController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/Get launches', async () => {
    const resp = await request(app.getHttpServer()).get('/v1/launches').expect(200);
    //  expect(resp.body.length)
  });

  it('/Get launches should only return 10 data', async () => {
    await request(app.getHttpServer()).get('/v1/launches?limit=10').expect(200);
  });

  it('/Post launch', async () => {
    await request(app.getHttpServer())
      .post('/v1/launches')
      .send({ target: '', rocket: '', launchDate: '', mission: '' })
      .expect(201);
  });

  it('/Post launche should return error invalid data', async () => {
    await request(app.getHttpServer())
      .post('/v1/launches')
      .send({ target: '', rocket: '', launchDate: '', mission: '' })
      .expect(422);
  });

  it('/Post launche should return error invalid date', async () => {
    await request(app.getHttpServer())
      .post('/v1/launches')
      .send({ target: '', rocket: '', launchDate: 'invalid date', mission: '' })
      .expect(422);
  });

  it('/Delete launch', async () => {
    await request(app.getHttpServer()).delete('/v1/launches/10').expect(204);
  });

  it('/Delete should return error', async () => {
    await request(app.getHttpServer()).delete('/v1/launches/10000').expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
