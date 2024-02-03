import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { Zone } from 'zones/entities/zone.entity';

export default class ZonesSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Zone);

    const repositoryMP = dataSource.getRepository(ManufacturingPlant);

    const cuatitlan = await repositoryMP.findOneBy({ name: 'Cuautitlán' });
    const tepozotlan = await repositoryMP.findOneBy({ name: 'Tepotzotlán' });
    //const manizales = await repositoryMP.findOneBy({ name: 'Manizales' });
    // const barranquilla = await repositoryMP.findOneBy({ name: 'Barranquilla' });

    const dataCuatitlan = [
      { name: 'Almacen', plant: cuatitlan },
      { name: 'Calidad', plant: cuatitlan },
      { name: 'Comedor', plant: cuatitlan },
      { name: 'Estacionamiento', plant: cuatitlan },
      { name: 'Jaboneria', plant: cuatitlan },
      { name: 'Llenadora', plant: cuatitlan },
      { name: 'Maceraciones', plant: cuatitlan },
      { name: 'Oficinas 1er piso', plant: cuatitlan },
      { name: 'Oficinas 2er piso', plant: cuatitlan },
      { name: 'Pasillo principal', plant: cuatitlan },
      { name: 'Perfumeria', plant: cuatitlan },
      { name: 'Vestidor H', plant: cuatitlan },
      { name: 'Vestidor M', plant: cuatitlan },
    ];

    const dataTepozotlan = [
      { name: 'Agua desionizada', plant: tepozotlan },
      { name: 'Almacen', plant: tepozotlan },
      { name: 'Caldera', plant: tepozotlan },
      { name: 'Calidad', plant: tepozotlan },
      { name: 'Comedor', plant: tepozotlan },
      { name: 'Estacionamiento', plant: tepozotlan },
      { name: 'Ingeniera', plant: tepozotlan },
      { name: 'Innovación', plant: tepozotlan },
      { name: 'Jaboneria', plant: tepozotlan },
      { name: 'Liquidos', plant: tepozotlan },
      { name: 'Oficinas', plant: tepozotlan },
      { name: 'Plancha', plant: tepozotlan },
      { name: 'Vestidor H', plant: tepozotlan },
      { name: 'Vestidor M', plant: tepozotlan },
    ];

    const data = [...dataCuatitlan, ...dataTepozotlan];

    for (let i = 0, t = data.length; i < t; i++) {
      const { name, plant } = data[i];

      const zone = await repository.findOneBy({
        name,
        manufacturingPlant: {
          id: plant.id,
        },
      });

      if (!zone) {
        const zoneCreate = await repository.create({
          name: data[i].name,
          manufacturingPlant: data[i].plant,
        });
        await repository.save(zoneCreate);
      }
    }
  }
}
