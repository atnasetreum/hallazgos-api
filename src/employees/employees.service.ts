import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository, FindOptionsWhere } from 'typeorm';

import { Employee, EmployeeArea, EmployeePosition } from './entities';
import {
  CreateEmployeeDto,
  FiltersEmployeeDto,
  UpdateEmployeeDto,
} from './dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(EmployeeArea)
    private readonly employeeAreaRepository: Repository<EmployeeArea>,
    @InjectRepository(EmployeePosition)
    private readonly employeePositionRepository: Repository<EmployeePosition>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return createEmployeeDto;
  }

  async seed() {
    const data = [
      {
        name: 'SANCHEZ TORRES MARIA DE JESUS',
        code: 10963,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'FERNANDO CAMPOS MARIA TRINIDAD',
        code: 10964,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'DEL MORAL HERNANDEZ GISSEL DEL CARMEN',
        code: 10965,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'SALINAS ORANTES MARIA DEL ROSARIO',
        code: 10966,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'ROSAS MARTINEZ MARIA GUADALUPE',
        code: 10967,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'SANCHEZ HERNANDEZ LUZ ANILY',
        code: 10968,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'GONZALEZ SANCHEZ GUADALUPE VIRIDIANA',
        code: 10969,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'FLORES VELAZQUEZ NOEMI',
        code: 10970,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'MARTINEZ LOPEZ MARISOL',
        code: 10971,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'SALGADO GARCIA ALFREDO',
        code: 10972,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'SEGUNDO MARQUEZ MARIA DEL ROSARIO',
        code: 10973,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'INOCENCIO GRANILLO LIZBETH ESMERALDA',
        code: 10974,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'PEREZ VELAZQUEZ OLGA',
        code: 10975,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'FLORES HERNANDEZ BRIHAN YAEL',
        code: 10976,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'HERNANDEZ PEREZ ERIKA MONSERRAT',
        code: 10977,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'GONZALEZ SAN MARTIN DENISSE ARACELI',
        code: 10978,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'ALTAMIRANO HERNANDEZ MARTHA JUDITH',
        code: 10979,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'VAZQUEZ MONTOYA ALEXIA GERALDINE',
        code: 10980,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'ALATORRE GRANADOS ANGEL GAEL',
        code: 10981,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'CAMPOS VILLA JULIO CESAR',
        code: 10982,
        position: 'Operario Logistico',
        area: 'Logística',
      },
      {
        name: 'ESPINOSA ISLAS ULISES',
        code: 10983,
        position: 'Operador de Montacargas',
        area: 'Logística',
      },
      {
        name: 'CARMONA GARCIA ANTONIO',
        code: 10984,
        position: 'Operador de Montacargas',
        area: 'Logística',
      },
      {
        name: 'CALZADA VILLA JOSUE',
        code: 10985,
        position: 'Operador de Montacargas',
        area: 'Logística',
      },
      {
        name: 'MATIAS REYES JESUS ANGEL',
        code: 10986,
        position: 'Operador de Montacargas',
        area: 'Logística',
      },
      {
        name: 'PEÑA CASARES JOSE EDUARDO',
        code: 10987,
        position: 'Operador de Montacargas',
        area: 'Logística',
      },
      {
        name: 'REYES SANCHEZ MARICRUZ',
        code: 10988,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'MARTINEZ GONZALEZ LAURA KENIA',
        code: 10989,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'RODRIGUEZ TORRES AHTZIRI',
        code: 10990,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'SALAZAR RAMIREZ JULISA',
        code: 10991,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'RIOS ANGEL IRENE MARIBEL',
        code: 10992,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'PORTILLO SUAREZ NANCY',
        code: 10993,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'CHAVARRIA ESPINOSA ADRIANA',
        code: 10994,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'CARMONA PEÑA SANDRA',
        code: 10995,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'MORALES VAZQUEZ VERONICA',
        code: 10996,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'PACHECO LARA SALMA',
        code: 10997,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'MONDRAGON DE LUNA LUIS ANTONIO',
        code: 10998,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'HERNANDEZ FELIX JUAN CARLOS',
        code: 10999,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'LARA MORALES BRENDA KARINA',
        code: 11000,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'CORZO ESPARRAGOZA KARLA',
        code: 11001,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'JIMENEZ GONZALEZ YATZIRI',
        code: 11002,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'GUZMAN MARTINEZ KARLA',
        code: 11003,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'PELCASTRE GOMEZ JUDITH',
        code: 11004,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'RESENDIZ CASTILLO MARIA DEL SOCORRO',
        code: 11005,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'GALINDO MALAGON LESLIE PAOLA',
        code: 11006,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'DE LA CRUZ GONZALEZ CRISTINA',
        code: 11007,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'REYES DOMINGUEZ JOCELYN',
        code: 11008,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'SARABIA TRINADO JOCELYN',
        code: 11009,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'ALVAREZ BATRES LUZ ARELI',
        code: 11010,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'PAISANO SEGUNDO EUGENIA',
        code: 11011,
        position: 'Operario de Aseo',
        area: 'Producción',
      },
      {
        name: 'MARIN MENDOZA GILBERTO JESUS',
        code: 11012,
        position: 'Operario Logistico',
        area: 'Logística',
      },
      {
        name: 'CORONA MARTINEZ JOSE DE JESUS',
        code: 11013,
        position: 'Operario Logistico',
        area: 'Logística',
      },
      {
        name: 'PEREZ MENDOZA PABLO RODRIGO',
        code: 11014,
        position: 'Operario Logistico',
        area: 'Logística',
      },
      {
        name: 'ROMERO MEJIA JOSE RICARDO',
        code: 11015,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'BENITES REYES NAYELI',
        code: 11016,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'RODRIGUEZ ARIZPE JOSE ANGEL',
        code: 11017,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'PEREZ PINEDA GABRIEL',
        code: 11018,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'MONROY ESCALANTE MARIANA',
        code: 11019,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'SALAZAR AMBROSIO MARTHA',
        code: 11020,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'FLORES MEJIA LUIS MIGUEL',
        code: 11021,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'DOMINGUEZ TRIGUEROS FLOR GLADIS',
        code: 11022,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'GONZALEZ GUTIERREZ OWEN ARIEL',
        code: 11023,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'CALVO ALONSO LESLIE CARINA',
        code: 11024,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'ARROYO GALVAN ANGEL GABRIEL',
        code: 11025,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'FIGUEROA GOMEZ ROSA MARIA',
        code: 11026,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'LOPEZ BRUNO CLARA TONATZI',
        code: 11027,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'QUIJADA COLIN MARCO ANTONIO',
        code: 11028,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'ESPADAS MARTINEZ RICARDO',
        code: 11029,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'RAMIREZ ARELLANOS MAYRA YADIRA',
        code: 11030,
        position: 'Operario General',
        area: 'Producción',
      },
      {
        name: 'BRITO SOTO LUIS GUSTAVO',
        code: 20180,
        position: 'Auxiliar Administrativo Logística',
        area: 'Logística',
      },
      {
        name: 'GUTIERREZ HIDALGO CARLOS ABRAHAM',
        code: 20181,
        position: 'Supervisor de Logística',
        area: 'Logística',
      },
      {
        name: 'CRUZ SANCHEZ MARIA DEL ROSARIO',
        code: 20182,
        position: 'Auxiliar Administrativo Logística',
        area: 'Logística',
      },
      {
        name: 'LAZCANO QUEVEDO ALEJANDRO',
        code: 20183,
        position: 'Jefe de Mantenimiento',
        area: 'Ingeniería',
      },
      {
        name: 'TRUJILLO CHAGOYA DANIEL',
        code: 20184,
        position: 'Jefe de Excelencia Corporativa',
        area: 'CALIDAD',
      },
    ];

    for (const employee of data) {
      const area = employee.area;
      const position = employee.position;

      let currentArea = await this.employeeAreaRepository.findOne({
        where: { name: area },
      });

      let currentPosition = await this.employeePositionRepository.findOne({
        where: { name: position },
      });

      if (!currentArea) {
        currentArea = await this.employeeAreaRepository.save({ name: area });
      }

      if (!currentPosition) {
        currentPosition = await this.employeePositionRepository.save({
          name: position,
        });
      }

      const employeeExists = await this.employeeRepository.findOne({
        where: { code: employee.code },
      });

      if (employeeExists) {
        continue;
      }

      await this.employeeRepository.save({
        code: employee.code,
        name: employee.name,
        area: currentArea,
        position: currentPosition,
      });
    }

    return { message: 'Seed completed successfully' };
  }

  findAll(filtersEmployeeDto: FiltersEmployeeDto) {
    const where: FindOptionsWhere<Employee> = { isActive: true };

    if (filtersEmployeeDto.manufacturingPlantId) {
      where.manufacturingPlants = {
        id: filtersEmployeeDto.manufacturingPlantId,
      };
    }

    return this.employeeRepository.find({
      where,
      relations: ['area', 'position'],
      order: {
        name: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.employeeRepository.findOne({
      where: {
        id,
        isActive: true,
      },
      relations: ['area', 'position'],
    });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return { id, updateEmployeeDto };
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
