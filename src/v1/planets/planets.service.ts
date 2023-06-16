import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

export interface Planet {
  koi_disposition: string;
  koi_insol: number;
  koi_prad: number;
  kepler_name: string;
}

@Injectable()
export class PlanetsService {
  habitablePlanet: Planet[] = [];

  private isHabitablePlanet(planets) {
    return (
      planets['koi_disposition'] == 'CONFIRMED' &&
      planets['koi_insol'] >= 0.36 &&
      planets['koi_insol'] <= 1.11 &&
      planets['koi_prad'] < 1.6
    );
  }

  loadKeplerData(): Promise<Planet[]> {
    return new Promise((resolve, reject) => {
      createReadStream(path.join(__dirname, '..', '..', '..', 'keplar.csv'))
        .pipe(parse({ comment: '#', columns: true }))
        .on('error', (e) => reject(e))
        .on('data', (data) => {
          const keplerPlanet = this.isHabitablePlanet(data);
          if (keplerPlanet) {
            this.habitablePlanet.push(data);
          }
        })
        .on('end', () => {
          console.log('stream ended');
          return resolve(this.habitablePlanet);
        });
    });
  }
}
