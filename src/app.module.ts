import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanetsModule } from './v1/planets/planets.module';
import { LaunchesModule } from './v1/launches/launches.module';

@Module({
  imports: [PlanetsModule, LaunchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
