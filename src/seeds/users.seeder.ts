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

    const CEDIAlfacer = manufacturingPlants.find(
      (manufacturingPlant) => manufacturingPlant.name === 'CEDI Alfacer',
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

    const zonaComedorTepotzotlan = zonesTepotzotlan.find(
      (zone) => zone.name === 'Comedor',
    );

    const zonaComedorCuatitlan = zonesCuautitlan.find(
      (zone) => zone.name === 'Comedor',
    );

    const allZonesManizales = await zoneRepository.find({
      where: {
        manufacturingPlant: {
          id: manizales.id,
        },
      },
    });

    const zonesBarraquilla = await zoneRepository.find({
      where: {
        manufacturingPlant: {
          id: barranquilla.id,
        },
      },
    });

    const zonesCEDIAlfacer = await zoneRepository.find({
      where: {
        manufacturingPlant: {
          id: CEDIAlfacer.id,
        },
      },
    });

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
        name: 'Arnold Imitola',
        email: 'aimitola@hadamexico.com',
        password: 'aimitola',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [tepotzotlan, cuautitlan],
        zones: [
          zonaIngenieriaCuatitlan,
          zonaIngenieriaTepotzotlan,
          zonaComedorTepotzotlan,
          zonaComedorCuatitlan,
        ],
      },
      {
        name: 'Gerardo Villegas',
        email: 'galmmex2@hadamexico.com',
        password: 'galmmex2',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [tepotzotlan],
        zones: [zonaAlmacenTepotzotlan],
      },
      {
        name: 'Carolina  Velázquez',
        email: 'cvelasquez@hada.com.co',
        password: 'cvelasquez',
        role: ROLE_GENERAL,
        manufacturingPlants: [cuautitlan, tepotzotlan],
        zones: [],
      },
      {
        name: 'Kenia Larios',
        email: 'klarios@hadamexico.com',
        password: 'klarios',
        role: ROLE_GENERAL,
        manufacturingPlants: [tepotzotlan],
        zones: [],
      },
      {
        name: 'Juan Camilo',
        email: 'jgonzalez@hada.com.co',
        password: 'jgonzalez',
        role: ROLE_GENERAL,
        manufacturingPlants: [tepotzotlan, cuautitlan],
        zones: [],
      },
      {
        name: 'Luciano Vargas',
        email: 'lvargas@hadamexico.com',
        password: 'lvargas',
        role: ROLE_GENERAL,
        manufacturingPlants: [cuautitlan],
        zones: [],
      },
    ];

    const userManizales = [
      {
        name: 'Sofía Osorio',
        email: 'sst@hada.com.co',
        password: 'sst',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [manizales],
        zones: allZonesManizales,
      },
      {
        name: 'Sandra Mejía',
        email: 'smejia@hada.com.co',
        password: 'smejia',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [manizales],
        zones: allZonesManizales,
      },
      {
        name: 'Diva Valencia',
        email: 'dvalencia@hada.com.co',
        password: 'dvalencia',
        role: ROLE_GENERAL,
        manufacturingPlants: [manizales],
        zones: [],
      },
      {
        name: 'Julian Buritica',
        email: 'jburitica@hada.com.co',
        password: 'jburitica',
        role: ROLE_GENERAL,
        manufacturingPlants: [manizales],
        zones: [],
      },
      {
        name: 'Juliana Aguirre',
        email: 'jaguirre@hada.com.co',
        password: 'jaguirre',
        role: ROLE_GENERAL,
        manufacturingPlants: [manizales],
        zones: [],
      },
      {
        name: 'Tatiana Echeverry',
        email: 'archivo@hada.com.co',
        password: 'archivo',
        role: ROLE_GENERAL,
        manufacturingPlants: [manizales],
        zones: [],
      },
      {
        name: 'Paola Bojaca',
        email: 'pbojaca@hada.com.co',
        password: 'pbojaca',
        role: ROLE_GENERAL,
        manufacturingPlants: [manizales],
        zones: [],
      },
      {
        name: 'Lady Hernandez',
        email: 'auxfacturacion@hada.com.co',
        password: 'auxfacturacion',
        role: ROLE_GENERAL,
        manufacturingPlants: [manizales],
        zones: [],
      },
    ];

    const usersBarranquilla = [
      {
        name: 'Carolina Velasquez',
        email: 'cvelasquez@hada.com.co',
        password: 'cvelasquez',
        role: ROLE_GENERAL,
        manufacturingPlants: [CEDIAlfacer, barranquilla],
        zones: [],
      },
      {
        name: 'Juan Camilo Gonzalez',
        email: 'jgonzalez@hada.com.co',
        password: 'jgonzalez',
        role: ROLE_GENERAL,
        manufacturingPlants: [CEDIAlfacer, barranquilla],
        zones: [],
      },
      {
        name: 'Belkis Torres',
        email: 'btorres@hadainternational.com',
        password: 'btorres',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Yesid Plata',
        email: 'yplata@hadainternational.com',
        password: 'yplata',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Polina Hernandez',
        email: 'phernandez@hadainternational.com',
        password: 'phernandez',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Donaldo Hernandez',
        email: 'dhernandez@hadainternational.com',
        password: 'dhernandez',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Charet Macias',
        email: 'analistasistemadegestion@hadainternational.com',
        password: 'analistasistemadegestion',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Richard Echavez',
        email: 'cseguridad@hadainternational.com',
        password: 'cseguridad',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Milagro Molinares',
        email: 'mmolinares@hadainternational.com',
        password: 'mmolinares',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Roberto Gutierrez',
        email: 'rgutierrez@hadainternational.com',
        password: 'rgutierrez',
        role: ROLE_GENERAL,
        manufacturingPlants: [barranquilla],
        zones: [],
      },
      {
        name: 'Anyela Holguin',
        email: 'aholguin@hada.com.co',
        password: 'aholguin',
        role: ROLE_GENERAL,
        manufacturingPlants: [CEDIAlfacer, barranquilla],
        zones: [],
      },
      {
        name: 'Diego Londoño',
        email: 'dlondono@hada.com.co',
        password: 'dlondono',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [CEDIAlfacer],
        zones: zonesCEDIAlfacer,
      },
      {
        name: 'Libardo Lizarazo',
        email: 'llizarazo@hadainternational.com',
        password: 'llizarazo',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Camilo Salazar',
        email: 'csalazar@hadainternational.com',
        password: 'csalazar',
        role: ROLE_GENERAL,
        manufacturingPlants: [barranquilla],
        zones: [],
      },
      {
        name: 'Laury Bustillo',
        email: 'lbustillo@hadainternational.com',
        password: 'lbustillo',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Ricardo Martinez',
        email: 'rmartinez@hadainternational.com',
        password: 'rmartinez',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Diego Díaz',
        email: 'ddiaz@hada.com.co',
        password: 'ddiaz',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Coordinadores de producción',
        email: 'cproduccion@hadainternational.com',
        password: 'cproduccion',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'John Carbonell',
        email: 'jcarbonell@hadainternational.com',
        password: 'jcarbonell',
        role: ROLE_GENERAL,
        manufacturingPlants: [barranquilla],
        zones: [],
      },
      {
        name: 'Fernando Urquijo',
        email: 'furquijo@hadainternational.com',
        password: 'furquijo',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Hernando Yepez',
        email: 'hyepes@hadainternational.com',
        password: 'hyepes',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Victor Consuegra',
        email: 'vconsuegra@hadainternational.com',
        password: 'vconsuegra',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Luis Fernando Muñoz',
        email: 'jefedeseguridad@hadainternational.com',
        password: 'jefedeseguridad',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Gustavo Tarazona',
        email: 'gustavo.tarazonap@dhl.com',
        password: 'gustavo.tarazonap',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Jhonny Franco',
        email: 'jfranco@hadainternational.com',
        password: 'jfranco',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Leonardo Leon',
        email: 'analisisinstrumental@hadainternational.com',
        password: 'analisisinstrumental',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
      },
      {
        name: 'Martin Ruiz',
        email: 'mruiz@hadainternational.com',
        password: 'mruiz',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: zonesBarraquilla,
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

    const data = [
      ...userDevs,
      ...usersMexico,
      ...userManizales,
      ...usersBarranquilla,
    ];

    for (let i = 0; i < data.length; i++) {
      const dataCurrent = data[i];

      const user = await userRepository.findOneBy({ email: dataCurrent.email });

      if (!user) {
        const userCreate = await userRepository.create(dataCurrent);
        await userRepository.save(userCreate);
      } else {
        user.zones = dataCurrent.zones;
        user.manufacturingPlants = dataCurrent.manufacturingPlants;
        await userRepository.save(user);
      }
    }
  }
}
