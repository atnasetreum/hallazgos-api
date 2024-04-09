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
    const cediAlfacer = await repositoryMP.findOneBy({ name: 'CEDI Alfacer' });

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
      { name: 'Almacen de repuesto', plant: barranquilla },
      { name: 'Almacenamiento de Molido', plant: barranquilla },
      { name: 'Area de Molino', plant: barranquilla },
      { name: 'Area perimetral fase 1, 2 y 3', plant: barranquilla },
      { name: 'Area perimetral fase 4', plant: barranquilla },
      { name: 'Axia', plant: barranquilla },
      { name: 'Bodega de almacenamient', plant: barranquilla },
      { name: 'Bodega de almacenamiento fase 4', plant: barranquilla },
      { name: 'Cafeteria ', plant: barranquilla },
      { name: 'Cafetería fase 1', plant: barranquilla },
      { name: 'Centro de acopio ', plant: barranquilla },
      { name: 'Control de acceso - Recepción Fase 4', plant: barranquilla },
      { name: 'Control de acceso Fase 1', plant: barranquilla },
      { name: 'Cuarto de contramuestra', plant: barranquilla },
      { name: 'Cuarto de lavado', plant: barranquilla },
      { name: 'Empaque manual fase 4', plant: barranquilla },
      { name: 'Mezclado fase 1 y 2', plant: barranquilla },
      { name: 'Mezclado Fase 4', plant: barranquilla },
      { name: 'Oficinas 1er piso', plant: barranquilla },
      { name: 'Oficinas 2do piso', plant: barranquilla },
      { name: 'Oficinas 2do piso', plant: barranquilla },
      { name: 'Oficinas 3er piso', plant: barranquilla },
      { name: 'Patio de tanques', plant: barranquilla },
      { name: 'Planta de producción acabado fase 1 y 2', plant: barranquilla },
      { name: 'Planta de producción Acabado fase 4', plant: barranquilla },
      { name: 'Planta de producción fase 1, 2 y 3', plant: barranquilla },
      { name: 'Planta de producción fase 4', plant: barranquilla },
      { name: 'Planta de producción Hada Ecofire', plant: barranquilla },
      { name: 'Recepción Fase 1', plant: barranquilla },
      { name: 'Sala de capacitaciones', plant: barranquilla },
      { name: 'Saponificación y Secado ', plant: barranquilla },
      { name: 'Servicios a la producción', plant: barranquilla },
      { name: 'Shut de basuras', plant: barranquilla },
      { name: 'Taller de mantenimiento  - Ingeniería', plant: barranquilla },
      { name: 'Torre de enfriamiento', plant: barranquilla },
      { name: 'Vestidor- Baño Contratistas fase 4', plant: barranquilla },
      { name: 'Vestidor- Baño M fase 1', plant: barranquilla },
      { name: 'Vestidor- Baño M fase 4', plant: barranquilla },
      { name: 'Vestidor-Baño H fase 1', plant: barranquilla },
      { name: 'Vestidor-Baño H fase 4', plant: barranquilla },
    ];

    const dataCEDIAlfacer = [
      { name: 'Area de alistamiento', plant: cediAlfacer },
      { name: 'Area de baterias', plant: cediAlfacer },
      { name: 'Area de devoluciones y PNC', plant: cediAlfacer },
      { name: 'Area perimetral ', plant: cediAlfacer },
      { name: 'Baño Hombre', plant: cediAlfacer },
      { name: 'Baño Mujer', plant: cediAlfacer },
      { name: 'Bodega de almacenamiento', plant: cediAlfacer },
      { name: 'Cafetería', plant: cediAlfacer },
      { name: 'Caniles', plant: cediAlfacer },
      { name: 'Cuarto de aseo', plant: cediAlfacer },
      { name: 'Muelles', plant: cediAlfacer },
      { name: 'Oficinas ', plant: cediAlfacer },
      { name: 'Recepción', plant: cediAlfacer },
      { name: 'Vestier Hombre', plant: cediAlfacer },
      { name: 'Vestier Mujer', plant: cediAlfacer },
    ];

    const data = [
      ...dataCuatitlan,
      ...dataTepozotlan,
      ...dataManizales,
      ...dataBarranquilla,
      ...dataCEDIAlfacer,
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
