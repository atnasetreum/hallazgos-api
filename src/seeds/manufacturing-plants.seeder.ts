import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';

export default class ManufacturingPlantsSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManufacturingPlant);

    const data = [
      {
        name: 'Cuautitlán',
        link: 'https://maps.app.goo.gl/nLEwYidJwCwhScGA6',
        lat: 19.662601755683117,
        lng: -99.19024656931825,
      },
      {
        name: 'Tepotzotlán',
        link: 'https://maps.app.goo.gl/kHRZhX6eM6YmQnjP6',
        lat: 19.714173149900997,
        lng: -99.20358979999999,
      },
      {
        name: 'Barranquilla',
        link: 'https://maps.app.goo.gl/wLFnZoGDeJ7nkaWD8',
        lat: 10.951554871145627,
        lng: -74.90768598465914,
      },
      {
        name: 'Manizales',
        link: 'https://maps.app.goo.gl/J9eRW4sKknodPu8Z8',
        lat: 5.056225853154673,
        lng: -75.48626507116478,
      },
      {
        name: 'CEDI Alfacer',
        link: 'https://maps.app.goo.gl/fmyuNsyG4gGDoa5Z9',
        lat: 10.9670024,
        lng: -74.7681337,
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
