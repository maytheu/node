import { Controller, Get } from '@nestjs/common';
import { PlanetsService } from './planets.service';

@Controller(['v1/planets', 'dev/v1/planets'])
export class PlanetsController {
  constructor(private planetService: PlanetsService) {}
  @Get()
  async getAllPlanets() {
    const planets = await this.planetService.loadKeplerData();
    return planets;
  }
}
