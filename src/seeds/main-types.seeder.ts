import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { MainType } from 'main-types/entities/main-type.entity';

export default class MainTypesSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(MainType);

    const data = [
      {
        name: 'Condición insegura',
      },
      {
        name: 'Comportamiento inseguro',
      },
    ];

    for (let i = 0, t = data.length; i < t; i++) {
      const { name } = data[i];

      const mainType = await repository.findOneBy({ name });

      if (!mainType) {
        const mainTypeCreate = await repository.create(data);
        await repository.save(mainTypeCreate);
      }
    }
  }
}
