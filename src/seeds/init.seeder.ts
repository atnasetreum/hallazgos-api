import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';

import ManufacturingPlantsSeeder from './manufacturing-plants.seeder';
import ZonesSeeder from './zones.seeder';
import UserSeeder from './users.seeder';
import MainTypesSeeder from './main-types.seeder';
import SecondaryTypesSeeder from './secondary-types.seeder';

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await runSeeders(dataSource, {
      seeds: [
        ManufacturingPlantsSeeder,
        MainTypesSeeder,
        SecondaryTypesSeeder,
        ZonesSeeder,
        UserSeeder,
      ],
    });
  }
}
