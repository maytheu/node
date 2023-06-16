import { Controller, Delete, Get, HttpCode, Post } from '@nestjs/common';
import { LaunchesService } from './launches.service';

@Controller('v1/launches')
export class LaunchesController {
  constructor(private launchService: LaunchesService) {}

  @Get()
  async allLaunch() {
    return 'all launch';
  }

  @Post()
  async scheduleLaunch() {
    return 'scheduled';
  }

  @Delete()
  @HttpCode(204)
  async deleteLaunch() {
    return 'deleted';
  }
}
