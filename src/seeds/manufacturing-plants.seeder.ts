import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';

export default class ManufacturingPlantsSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManufacturingPlant);

    const data = [
      {
        name: 'Cuautitlán',
      },
      {
        name: 'Tepotzotlán',
      },
      {
        name: 'Barranquilla',
      },
      {
        name: 'Manizales',
      },
    ];

    for (let i = 0, t = data.length; i < t; i++) {
      const { name } = data[i];

      const manufacturingPlant = await repository.findOneBy({ name });

      if (!manufacturingPlant) {
        const manufacturingPlantCreate = await repository.create(data);
        await repository.save(manufacturingPlantCreate);
      }
    }
  }
}
