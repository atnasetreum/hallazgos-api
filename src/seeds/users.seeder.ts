import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { ManufacturingPlant } from 'manufacturing-plants/entities/manufacturing-plant.entity';
import { User } from 'users/entities/user.entity';
import { Zone } from 'zones/entities/zone.entity';
import {
  ROLE_ADMINISTRADOR,
  ROLE_GENERAL,
  ROLE_SUPERVISOR,
} from '@shared/constants';

export default class UsersSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const manufacturingPlantRepository =
      dataSource.getRepository(ManufacturingPlant);

    const zoneRepository = dataSource.getRepository(Zone);

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

    const barranquilla = manufacturingPlants.find(
      (manufacturingPlant) => manufacturingPlant.name === 'Barranquilla',
    );

    const zonesCuautitlan = await zoneRepository.find({
      where: {
        manufacturingPlant: {
          id: cuautitlan.id,
        },
      },
    });

    const zonesTepotzotlan = await zoneRepository.find({
      where: {
        manufacturingPlant: {
          id: tepotzotlan.id,
        },
      },
    });

    const zonaLiquidosTepotzotlan = zonesTepotzotlan.find(
      (zone) => zone.name === 'Liquidos',
    );

    const zonaJaboneriaTepotzotlan = zonesTepotzotlan.find(
      (zone) => zone.name === 'Jaboneria',
    );

    const zonaPerfumeriaCuatitlan = zonesCuautitlan.find(
      (zone) => zone.name === 'Perfumeria',
    );

    const zonaMaceracionesCuatitlan = zonesCuautitlan.find(
      (zone) => zone.name === 'Maceraciones',
    );

    const zonaJaboneriaCuatitlan = zonesCuautitlan.find(
      (zone) => zone.name === 'Jaboneria',
    );

    const zonaAlmacenTepotzotlan = zonesTepotzotlan.find(
      (zone) => zone.name === 'Almacen',
    );

    const zonaAlmacenCuatitlan = zonesCuautitlan.find(
      (zone) => zone.name === 'Almacen',
    );

    const zonaCalidadTepotzotlan = zonesTepotzotlan.find(
      (zone) => zone.name === 'Calidad',
    );

    const zonaCalidadCuatitlan = zonesCuautitlan.find(
      (zone) => zone.name === 'Calidad',
    );

    const zonaIngenieriaCuatitlan = zonesCuautitlan.find(
      (zone) => zone.name === 'Ingeniera',
    );

    const zonaIngenieriaTepotzotlan = zonesTepotzotlan.find(
      (zone) => zone.name === 'Ingeniera',
    );

    const zonaVestidorHTepotzotlan = zonesTepotzotlan.find(
      (zone) => zone.name === 'Vestidor H',
    );

    const zonaVestidorMTepotzotlan = zonesTepotzotlan.find(
      (zone) => zone.name === 'Vestidor M',
    );

    const zonaAguaDesionizadaTepotzotlan = zonesTepotzotlan.find(
      (zone) => zone.name === 'Agua Desionizada',
    );

    const usersMexico = [
      {
        name: 'Diego Loaiza',
        email: 'dloaiza@hadamexico.com',
        password: 'dloaiza',
        role: ROLE_GENERAL,
        manufacturingPlants: [cuautitlan, tepotzotlan],
        zones: [],
      },
      {
        name: 'Alfonso Arrieta',
        email: 'sst@hadamexico.com',
        password: 'crmECA90',
        role: ROLE_ADMINISTRADOR,
        manufacturingPlants: [cuautitlan, tepotzotlan],
        zones: [],
      },
      {
        name: 'David Sanvicente',
        email: 'dsanvicente@hadamexico.com',
        password: 'dsanvicente',
        role: ROLE_GENERAL,
        manufacturingPlants: [cuautitlan, tepotzotlan],
        zones: [],
      },
      {
        name: 'David Spaggiari',
        email: 'dspaggiari@hadamexico.com',
        password: 'dspaggiari',
        role: ROLE_GENERAL,
        manufacturingPlants: [cuautitlan, tepotzotlan],
        zones: [],
      },
      {
        name: 'Ernesto Zuppa',
        email: 'ezuppa@hadamexico.com',
        password: 'ezuppa',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [tepotzotlan],
        zones: [
          zonaLiquidosTepotzotlan,
          zonaJaboneriaTepotzotlan,
          zonaVestidorHTepotzotlan,
          zonaVestidorMTepotzotlan,
          zonaAguaDesionizadaTepotzotlan,
        ],
      },
      {
        name: 'Geovany Garcia',
        email: 'sproduccion@hadamexico.com',
        password: 'sproduccion',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [tepotzotlan],
        zones: [
          zonaLiquidosTepotzotlan,
          zonaJaboneriaTepotzotlan,
          zonaVestidorHTepotzotlan,
          zonaVestidorMTepotzotlan,
          zonaAguaDesionizadaTepotzotlan,
        ],
      },
      {
        name: 'Froylan Gonzalez / Alexis rodriguez / Liliana Arroyo',
        email: 'sproduccion.cu@hadamexico.com',
        password: 'sproduccion.cu',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [cuautitlan],
        zones: [
          zonaPerfumeriaCuatitlan,
          zonaMaceracionesCuatitlan,
          zonaJaboneriaCuatitlan,
        ],
      },
      {
        name: 'Susana Trujillo',
        email: 'strujillo@hadamexico.com',
        password: 'strujillo',
        role: ROLE_ADMINISTRADOR,
        manufacturingPlants: [cuautitlan, tepotzotlan],
        zones: [],
      },
      {
        name: 'Anyela Holguin',
        email: 'aholguin@hada.com.co',
        password: 'aholguin',
        role: ROLE_ADMINISTRADOR,
        manufacturingPlants: [cuautitlan, tepotzotlan, manizales, barranquilla],
        zones: [],
      },
      {
        name: 'Ximena Rodriguez',
        email: 'sst2@hadamexico.com',
        password: 'sst2',
        role: ROLE_GENERAL,
        manufacturingPlants: [cuautitlan, tepotzotlan],
        zones: [],
      },
      {
        name: 'Gabriela Salgado',
        email: 'gsalgado@hadamexico.com',
        password: 'gsalgado',
        role: ROLE_GENERAL,
        manufacturingPlants: [cuautitlan, tepotzotlan],
        zones: [],
      },
      {
        name: 'Fernando Sanchez',
        email: 'fsanchez@hadamexico.com',
        password: 'fsanchez',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [cuautitlan, tepotzotlan],
        zones: [zonaAlmacenTepotzotlan],
      },
      {
        name: 'Hector padilla',
        email: 'hpadilla@hadamexico.com',
        password: 'hpadilla',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [tepotzotlan],
        zones: [zonaAlmacenTepotzotlan],
      },
      {
        name: 'Gustavo Herrera',
        email: 'gherrera@hadamexico.com',
        password: 'gherrera',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [cuautitlan],
        zones: [zonaAlmacenCuatitlan],
      },
      {
        name: 'Carlos Flores',
        email: 'cflores@hadamexico.com',
        password: 'cflores',
        role: ROLE_GENERAL,
        manufacturingPlants: [cuautitlan, tepotzotlan],
        zones: [],
      },
      {
        name: 'Juan Dominguez',
        email: 'jdominguez@hadamexico.com',
        password: 'jdominguez',
        role: ROLE_GENERAL,
        manufacturingPlants: [cuautitlan, tepotzotlan],
        zones: [],
      },
      {
        name: 'Gabriel Garcia',
        email: 'ggarcia@hadamexico.com',
        password: 'ggarcia',
        role: ROLE_GENERAL,
        manufacturingPlants: [tepotzotlan, cuautitlan],
        zones: [],
      },
      {
        name: 'Ramón Ramírez',
        email: 'rramirez@hadamexico.com',
        password: 'rramirez',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [tepotzotlan, cuautitlan],
        zones: [zonaCalidadTepotzotlan, zonaCalidadCuatitlan],
      },
      {
        name: 'Sofía Osorio',
        email: 'sst@hada.com.co',
        password: 'sst',
        role: ROLE_GENERAL,
        manufacturingPlants: [tepotzotlan, cuautitlan],
        zones: [],
      },
      {
        name: 'Arnold Imitola',
        email: 'aimitola@hadamexico.com',
        password: 'aimitola',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [tepotzotlan, cuautitlan],
        zones: [zonaIngenieriaCuatitlan, zonaIngenieriaTepotzotlan],
      },
      {
        name: 'Gerardo Villegas',
        email: 'galmmex2@hadamexico.com',
        password: 'galmmex2',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [tepotzotlan],
        zones: [zonaAlmacenTepotzotlan],
      },
    ];

    const userDevs = [
      {
        name: 'Eduardo Admin',
        email: 'eduardo-266@hotmail.com',
        password: '123',
        role: ROLE_ADMINISTRADOR,
        manufacturingPlants: [cuautitlan, tepotzotlan, manizales, barranquilla],
        zones: [],
      },
      {
        name: 'Eduardo Supervisor',
        email: 'eduardo-supervisor@hotmail.com',
        password: '123',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [cuautitlan, tepotzotlan, manizales, barranquilla],
        zones: [...zonesCuautitlan, ...zonesTepotzotlan],
      },
      {
        name: 'Eduardo General',
        email: 'eduardo-general@hotmail.com',
        password: '123',
        role: ROLE_GENERAL,
        manufacturingPlants: [cuautitlan, tepotzotlan, manizales, barranquilla],
        zones: [],
      },
    ];

    const data = [...userDevs, ...usersMexico];

    for (let i = 0; i < data.length; i++) {
      const dataCurrent = data[i];

      const user = await userRepository.findOneBy({ email: dataCurrent.email });

      if (!user) {
        const userCreate = await userRepository.create(dataCurrent);
        await userRepository.save(userCreate);
      } else {
        user.zones = dataCurrent.zones;
        await userRepository.save(user);
      }
    }
  }
}
