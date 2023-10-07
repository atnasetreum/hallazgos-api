import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';

import UserSeeder from './user.seeder';

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await runSeeders(dataSource, {
      seeds: [UserSeeder],
    });
  }
}
