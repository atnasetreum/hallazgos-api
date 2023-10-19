import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { Zone } from 'zones/entities/zone.entity';

export default class ZonesSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Zone);

    const data = [
      {
        name: 'PERFUMERIA',
      },
      {
        name: 'SAPONIFICACION',
      },
      {
        name: 'SECADO',
      },
      {
        name: 'MANTENIMIENTO',
      },
      {
        name: 'LOGISTICA',
      },
    ];

    for (let i = 0, t = data.length; i < t; i++) {
      const { name } = data[i];

      const zone = await repository.findOneBy({ name });

      if (!zone) {
        const zoneCreate = await repository.create(data);
        await repository.save(zoneCreate);
      }
    }
  }
}
