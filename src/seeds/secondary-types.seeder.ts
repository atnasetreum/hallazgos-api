import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { SecondaryType } from 'secondary-types/entities/secondary-type.entity';
import { MainType } from 'main-types/entities/main-type.entity';

export default class SecondaryTypesSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const mainTypeRepository = dataSource.getRepository(MainType);
    const secondaryTypeRepository = dataSource.getRepository(SecondaryType);

    const mainCondition = await mainTypeRepository.findOneBy({
      name: 'Condición insegura',
    });
    const data1 = [
      'Máquina sin guarda de seguridad',
      'Sensor de seguridad sin funcionamiento',
      'Escalera en mal estado',
      'Fuga de aceite',
      'Tubería sin aislamiento de calor',
    ];
    for (let i = 0, t = data1.length; i < t; i++) {
      const name = data1[i];

      const secondaryType = await secondaryTypeRepository.findOneBy({ name });

      if (!secondaryType) {
        const secondaryTypeCreate = await secondaryTypeRepository.create({
          name,
          mainType: mainCondition,
        });
        await secondaryTypeRepository.save(secondaryTypeCreate);
      }
    }

    const unsafeBehavior = await mainTypeRepository.findOneBy({
      name: 'Comportamiento inseguro',
    });
    const data2 = [
      'Manipulación de máquina con sensores de seguridad activados',
      'Uso de paro de emergencia',
      'Uso adecuado de EPP',
      'Uso de guardas de seguridad',
      'Levantamiento de cargas no mayor a 25 kl (Hombre)',
      'Levantamiento de cargas no mayor a 12.5 kl (Mujer)',
    ];
    for (let i = 0, t = data2.length; i < t; i++) {
      const name = data2[i];

      const secondaryType = await secondaryTypeRepository.findOneBy({ name });

      if (!secondaryType) {
        const secondaryTypeCreate = await secondaryTypeRepository.create({
          name,
          mainType: unsafeBehavior,
        });
        await secondaryTypeRepository.save(secondaryTypeCreate);
      }
    }
  }
}
