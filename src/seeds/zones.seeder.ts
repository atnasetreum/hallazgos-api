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
    const manizales = await repositoryMP.findOneBy({ name: 'Manizales' });
    const barranquilla = await repositoryMP.findOneBy({ name: 'Barranquilla' });

    const dataCuatitlan = [
      { name: 'Almacen', plant: cuatitlan },
      { name: 'Calidad', plant: cuatitlan },
      { name: 'Comedor', plant: cuatitlan },
      { name: 'Estacionamiento', plant: cuatitlan },
      { name: 'Ingeniera', plant: cuatitlan },
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

    const dataManizales = [
      { name: 'Archivo Manizales', plant: manizales },
      { name: 'Laboratorio Innovación', plant: manizales },
      { name: 'Lote Persia', plant: manizales },
      { name: 'Piso 9 Área administrativa', plant: manizales },
      { name: 'Piso 9 Café Magia', plant: manizales },
      { name: 'Piso 9 Recepción', plant: manizales },
      { name: 'Piso 9 Sala Cristalino', plant: manizales },
      { name: 'Piso 9 Sala de Juntas', plant: manizales },
      { name: 'Piso 9 Sala Deseo', plant: manizales },
      { name: 'Piso 9 Sala Heno de Pravia', plant: manizales },
      { name: 'Piso 9 Sala Magia', plant: manizales },
      { name: 'Piso 15 Área administrativa', plant: manizales },
      { name: 'Piso 15 Presidencia', plant: manizales },
      { name: 'Piso 15 Recepción', plant: manizales },
      { name: 'Piso 15 Sala Dans', plant: manizales },
      { name: 'Piso 15 Sala Mec', plant: manizales },
      { name: 'Piso 15 Terraza Encanto', plant: manizales },
    ];

    const dataBarranquilla = [
      { name: 'Almacén de Repuestos', plant: barranquilla },
      { name: 'Ambiental/PTAR', plant: barranquilla },
      { name: 'Automatización', plant: barranquilla },
      { name: 'BPM', plant: barranquilla },
      { name: 'Calidad', plant: barranquilla },
      { name: 'Casino y Aseo General', plant: barranquilla },
      { name: 'Comercio Exterior', plant: barranquilla },
      { name: 'Compras', plant: barranquilla },
      { name: 'ECOFIRE', plant: barranquilla },
      {
        name: 'Excelencia Corporativa/Miembro del COPASST',
        plant: barranquilla,
      },
      { name: 'Gestion Humana', plant: barranquilla },
      { name: 'Hadabio', plant: barranquilla },
      { name: 'Ingeniería de Proyectos', plant: barranquilla },
      { name: 'Líquidos', plant: barranquilla },
      { name: 'Logística/Bodegas', plant: barranquilla },
      { name: 'Mantenimiento Eléctrico', plant: barranquilla },
      { name: 'Mantenimiento Locativo', plant: barranquilla },
      { name: 'Mantenimiento Mecánico', plant: barranquilla },
      { name: 'Mantenimiento Mecánico /Caldera', plant: barranquilla },
      { name: 'Metrología', plant: barranquilla },
      { name: 'Miembro del COPASST', plant: barranquilla },
      { name: 'Miembro del COPASST', plant: barranquilla },
      {
        name: 'Producción de Solidos /Líneas de Producción',
        plant: barranquilla,
      },
      { name: 'Seguridad y Salud en el Trabajo', plant: barranquilla },
      { name: 'TIC', plant: barranquilla },
    ];

    const data = [
      ...dataCuatitlan,
      ...dataTepozotlan,
      ...dataManizales,
      ...dataBarranquilla,
    ];

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
