import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';

import ManufacturingPlantsSeeder from './manufacturing-plants.seeder';
import ZonesSeeder from './zones.seeder';
import UserSeeder from './users.seeder';

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await runSeeders(dataSource, {
      seeds: [ManufacturingPlantsSeeder, ZonesSeeder, UserSeeder],
    });
  }
}
