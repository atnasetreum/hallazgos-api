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

    const zonaAlmacenDeRepuestosBarranquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'Almacén de Repuestos',
    );

    const zonaHadabioBarranquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'Hadabio',
    );

    const zonaIngenieriaDeProyectosBarranquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'Ingeniería de Proyectos',
    );

    const zonaMantenimientoElectrico = zonesBarraquilla.find(
      (zone) => zone.name === 'Mantenimiento Eléctrico',
    );

    const zonaMantenimientoMecanicoCalderaBarranquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'Mantenimiento Mecánico /Caldera',
    );

    const zonaIngenieriaDeProyectosBarraquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'Ingeniería de Proyectos',
    );

    const zonaProduccionDeSolidosBarraquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'Producción de Solidos /Líneas de Producción',
    );

    const zonaMantenimientoMecanicoBarraquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'Mantenimiento Mecánico',
    );

    const zonaMetrologiaBarraquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'Metrología',
    );

    const zonaAutomatizacionBarraquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'Automatización',
    );

    const zonaMantenimientoLocativoBarraquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'Mantenimiento Locativo',
    );

    const zonaLogisticaBodegasBarraquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'Logística/Bodegas',
    );

    const zonaECOFIREBarraquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'ECOFIRE',
    );

    const zonaLiquidosBarranquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'Líquidos',
    );

    const zonaCasinoYAseoGeneralBarraquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'Casino y Aseo General',
    );

    const zonaCalidadBarranquilla = zonesBarraquilla.find(
      (zone) => zone.name === 'Calidad',
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
        name: 'ALEXANDER RAFAEL VEGA ROMERO',
        email: 'avega@hadainternational.com',
        password: 'avega',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaAlmacenDeRepuestosBarranquilla],
      },
      {
        name: 'BELKIS MARIA TORRES DIAZ',
        email: 'btorres@hadainternational.com',
        password: 'btorres',
        role: ROLE_GENERAL,
        manufacturingPlants: [barranquilla],
        zones: [],
      },
      {
        name: 'BRENDA MARGARITA VALDERRAMA BARRAZA',
        email: 'bvalderrama@hadainternational.com',
        password: 'bvalderrama',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaHadabioBarranquilla],
      },
      {
        name: 'CRISTIAN DANIEL GIL PATIÑO',
        email: 'cgil@hadainternational.com',
        password: 'cgil',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaIngenieriaDeProyectosBarranquilla],
      },
      {
        name: 'FERNANDO URQUIJO ALFONSO',
        email: 'furquijo@hadainternational.com',
        password: 'furquijo',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaMantenimientoElectrico],
      },
      {
        name: 'HERNANDO ALFONSO YEPES ORTEGA',
        email: 'hyepes@hadainternational.com',
        password: 'hyepes',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaMantenimientoMecanicoCalderaBarranquilla],
      },
      {
        name: 'JHON FREDI VALENCIA DUQUE',
        email: 'jvalencia@hadainternational.com',
        password: 'jvalencia',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaIngenieriaDeProyectosBarraquilla],
      },
      {
        name: 'JHONNY FRANCO BLANDON',
        email: 'jfranco@hadainternational.com',
        password: 'jfranco',
        role: ROLE_GENERAL,
        manufacturingPlants: [barranquilla],
        zones: [],
      },
      {
        name: 'JOAN SEBASTIAN JIMENEZ SIADO',
        email: 'jjimenez@hadainternational.com',
        password: 'jjimenez',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaProduccionDeSolidosBarraquilla],
      },
      {
        name: 'LENDYS MARIA PEREZ HERRERA',
        email: 'lperez@hadainternational.com',
        password: 'lperez',
        role: ROLE_GENERAL,
        manufacturingPlants: [barranquilla],
        zones: [],
      },
      {
        name: 'LEONARDO FABIO USMA ARANGO',
        email: 'lusma@hadainternational.com',
        password: 'lusma',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaMantenimientoMecanicoBarraquilla],
      },
      {
        name: 'LIBARDO JAIR LIZARAZO BENITEZ',
        email: 'llizarazo@hadainternational.com',
        password: 'llizarazo',
        role: ROLE_GENERAL,
        manufacturingPlants: [barranquilla],
        zones: [],
      },
      {
        name: 'LUIS FELIPE GUZMAN ROCA',
        email: 'lguzman@hadainternational.com',
        password: 'lguzman',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaProduccionDeSolidosBarraquilla],
      },
      {
        name: 'MARIA CAMILA DOMINGUEZ CHAMORRO',
        email: 'mdominguez@hadainternational.com',
        password: 'mdominguez',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaProduccionDeSolidosBarraquilla],
      },
      {
        name: 'MARIO ALBERTO GARCIA RODRIGUEZ',
        email: 'mgarcia@hadainternational.com',
        password: 'mgarcia',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaIngenieriaDeProyectosBarraquilla],
      },
      {
        name: 'MARIO ALBERTO ORELLANO SANCHEZ',
        email: 'morellano@hadainternational.com',
        password: 'morellano',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaProduccionDeSolidosBarraquilla],
      },
      {
        name: 'MAURICIO RAFAEL PEREZ ROLONG',
        email: 'mperez@hadainternational.com',
        password: 'mperez',
        role: ROLE_GENERAL,
        manufacturingPlants: [barranquilla],
        zones: [],
      },
      {
        name: 'MILAGROS SUGEIDIS MOLINARES MOLINA',
        email: 'mmolinares@hadainternational.COM',
        password: 'mmolinares',
        role: ROLE_GENERAL,
        manufacturingPlants: [barranquilla],
        zones: [],
      },
      {
        name: 'PETER ALEXANDER BARRIOS CALDERON',
        email: 'cmetrologia@hadainternational.com',
        password: 'cmetrologia',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaMetrologiaBarraquilla],
      },
      {
        name: 'POLINA ANDREA HERNANDEZ ARTEAGA',
        email: 'phernandez@hadainternational.com',
        password: 'phernandez',
        role: ROLE_GENERAL,
        manufacturingPlants: [barranquilla],
        zones: [],
      },
      {
        name: 'RAFAEL GUILLERMO LARA PADILLA',
        email: 'rlara@hadainternational.com',
        password: 'rlara',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaIngenieriaDeProyectosBarranquilla],
      },
      {
        name: 'RANDY STIVEN CONRADO BALZA',
        email: 'rconrado@hadainternational.com',
        password: 'rconrado',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaAutomatizacionBarraquilla],
      },
      {
        name: 'RICARDO ANDRES MARTINEZ ARANGO',
        email: 'rmartinez@hadainternational.com',
        password: 'rmartinez',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaProduccionDeSolidosBarraquilla],
      },
      {
        name: 'RICHARD JAIR ECHAVEZ ACUÑA',
        email: 'cseguridad@hadainternational.com',
        password: 'cseguridad',
        role: ROLE_GENERAL,
        manufacturingPlants: [barranquilla],
        zones: [],
      },
      {
        name: 'VICTOR AUGUSTO CONSUEGRA GOENAGA',
        email: 'vconsuegra@hadainternational.com',
        password: 'vconsuegra',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaMantenimientoLocativoBarraquilla],
      },
      {
        name: 'WILFREDO VERGARA SALAZAR',
        email: 'wvergara@hadainternational.com',
        password: 'wvergara',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaMantenimientoMecanicoBarraquilla],
      },
      {
        name: 'WILMER ANTONIO OSPINA RIVERA',
        email: 'wospina@hadainternational.com',
        password: 'wospina',
        role: ROLE_GENERAL,
        manufacturingPlants: [barranquilla],
        zones: [],
      },
      {
        name: 'YESID PLATA ASCANIO',
        email: 'yplata@hadainternational.com',
        password: 'yplata',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaLogisticaBodegasBarraquilla],
      },
      {
        name: 'YESID EZEQUIEL CHAVEZ SALCEDO',
        email: 'ychavez@hadainternational.com',
        password: 'ychavez',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaProduccionDeSolidosBarraquilla],
      },
      {
        name: 'MIGUEL PALACIO',
        email: 'mpalacio@hadainternational.com',
        password: 'mpalacio',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaECOFIREBarraquilla],
      },
      {
        name: 'Yoel San juan',
        email: 'auxliquidos@hadainternational.com',
        password: 'auxliquidos',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaLiquidosBarranquilla],
      },
      {
        name: 'Martin Ruiz',
        email: 'mruiz@hadainternational.com',
        password: 'mruiz',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaCasinoYAseoGeneralBarraquilla],
      },
      {
        name: 'Diego Diaz',
        email: 'ddiaz@hada.com.co',
        password: 'auxfacturacion',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaProduccionDeSolidosBarraquilla],
      },
      {
        name: 'ANDREA RODRIGUEZ',
        email: 'arodriguez@hadainternational.com',
        password: 'arodriguez',
        role: ROLE_GENERAL,
        manufacturingPlants: [barranquilla],
        zones: [],
      },
      {
        name: 'DAWIN TAPIAS',
        email: 'dtapias@hadainternational.com',
        password: 'dtapias',
        role: ROLE_GENERAL,
        manufacturingPlants: [barranquilla],
        zones: [],
      },
      {
        name: 'LEONARDO LEON',
        email: 'lleon@hadainternational.com',
        password: 'lleon',
        role: ROLE_SUPERVISOR,
        manufacturingPlants: [barranquilla],
        zones: [zonaCalidadBarranquilla],
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
