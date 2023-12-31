import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';
import { User } from 'users/entities/user.entity';
import { Zone } from 'zones/entities/zone.entity';
import { ROLE_ADMINISTRADOR, ROLE_SUPERVISOR } from '@shared/constants';

export default class UsersSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const manufacturingPlantRepository =
      dataSource.getRepository(ManufacturingPlant);

    const zoneRepository = dataSource.getRepository(Zone);

    const manufacturingPlants = await manufacturingPlantRepository.find();

    const zones = await zoneRepository.find();

    const data = [
      {
        name: 'Eduardo Garcia',
        email: 'eduardo-266@hotmail.com',
        password: '123',
        role: ROLE_ADMINISTRADOR,
        manufacturingPlants,
        //manufacturingPlants: [manufacturingPlants[0], manufacturingPlants[1]],
        zones,
      },
      /*{
        name: 'Omar Arrieta',
        email: 'sst@hadamexico.com',
        password: '201390Oaam',
        role: ROLE_ADMINISTRADOR,
        manufacturingPlants,
        zones,
      },*/

      {
        name: 'Eduardo Supervisor',
        email: 'atnasetreum@gmail.com',
        password: '123',
        role: ROLE_SUPERVISOR,
        manufacturingPlants,
        zones,
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
