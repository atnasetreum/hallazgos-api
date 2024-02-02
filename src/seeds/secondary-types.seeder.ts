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
      'Derrame de materiales y/o productos',
      'Equipos en movimiento sin guardas',
      'Equipos moviles sin check list',
      'Equipos moviles sin luz rutilante',
      'Equipos sin paro de emergencia',
      'Equipos sin señalizar ',
      'Estructuras dañadas',
      'Extintores sin señalizacion, seguro y dañados o en piso',
      'Falta capacidad de carga y estiba maxima en almacén',
      'Falta de barandal en superficies arriba de 1.50 mts',
      'Falta de rodapie',
      'Falta orden y limpieza',
      'Instalaciones electricas deficientes',
      'Maquinas y/o equipos improivisados',
      'Navajas sin protección',
      'Pallet mal estibado y/o sin playo',
      'Pasillos bloqueados',
      'Productos quimicos sin identificar',
      'Racks dañados',
      'Regaderas y lavaojos bloqueados o dañados',
      'Tableros electricos sin identificación ',
      'Tuberia sin señalizar  ',
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
      'Actividades por arriba de 1.5 mts sin EPP',
      'Actividades sin permiso de trabajo',
      'Activides de alto riesgo sin controles.',
      'Actos de bandalismo (pintas)',
      'Daño a materiales, equipos y/o herramientas',
      'Envolturas de alimentos ',
      'Juegos y/o bromas al personal',
      'Personal bajo efectos de alcohol y/o sustancias',
      'Personal sin EPP',
      'Uniformes sucios o en mal estado',
      'Uso de barba y/o accesorios',
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
