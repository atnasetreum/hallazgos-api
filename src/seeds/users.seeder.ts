import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';
import { User } from 'users/entities/user.entity';
// import { Zone } from 'zones/entities/zone.entity';
import {
  ROLE_ADMINISTRADOR,
  //ROLE_GENERAL,
  //ROLE_SUPERVISOR,
} from '@shared/constants';

export default class UsersSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const manufacturingPlantRepository =
      dataSource.getRepository(ManufacturingPlant);

    // const zoneRepository = dataSource.getRepository(Zone);

    const manufacturingPlants = await manufacturingPlantRepository.find();

    const cuautitlan = manufacturingPlants.find(
      (manufacturingPlant) => manufacturingPlant.name === 'Cuautitlán',
    );

    const tepotzotlan = manufacturingPlants.find(
      (manufacturingPlant) => manufacturingPlant.name === 'Tepotzotlán',
    );

    const manizales = manufacturingPlants.find(
      (manufacturingPlant) => manufacturingPlant.name === 'Manizales',
    );

    // const zones = await zoneRepository.find();

    const data = [
      {
        name: 'Sofia Osorio',
        email: 'sst@hada.com.co',
        password: 'sst',
        role: ROLE_ADMINISTRADOR,
        manufacturingPlants: [manizales],
        zones: [],
      },
      {
        name: 'Alfonso Arrieta',
        email: 'sst@hadamexico.com',
        password: '201390Oaam',
        role: ROLE_ADMINISTRADOR,
        manufacturingPlants: [cuautitlan, tepotzotlan],
        zones: [],
      },
      {
        name: 'Susana Trujillo',
        email: 'strujillo@hadamexico.com',
        password: 'strujillo',
        role: ROLE_ADMINISTRADOR,
        manufacturingPlants: [cuautitlan, tepotzotlan],
        zones: [],
      },
    ];

    for (let i = 0; i < data.length; i++) {
      const dataCurrent = data[i];

      const user = await userRepository.findOneBy({ email: dataCurrent.email });

      if (!user) {
        const userCreate = await userRepository.create(dataCurrent);
        await userRepository.save(userCreate);
      }
    }
  }
}
