import { Injectable } from '@nestjs/common';

import { CreateAtAgentDto, UpdateAtAgentDto } from './dto';
import { AtAgent } from './entities/at-agent.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AtAgentsService {
  constructor(
    @InjectRepository(AtAgent)
    private readonly atAgentRepository: Repository<AtAgent>,
  ) {}

  seed() {
    const data = [
      'Ambiente de trabajo (Incluye superficies de tránsito y de trabajo, muebles, tejados, en el exterior, interior o subterráneos)',
      'Herramientas, implementos o utensilios',
      'Máquinas y/o equipos',
      'Materiales o sustancias',
      'Medios de transporte',
      'Otros agentes no clasificados',
    ];

    data.forEach(async (name) => {
      const atAgent = this.atAgentRepository.create({ name });
      await this.atAgentRepository.save(atAgent);
    });

    return 'Seeding at agents...';
  }

  create(createAtAgentDto: CreateAtAgentDto) {
    return createAtAgentDto;
  }

  findAll() {
    return `This action returns all atAgents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} atAgent`;
  }

  update(id: number, updateAtAgentDto: UpdateAtAgentDto) {
    return { id, updateAtAgentDto };
  }

  remove(id: number) {
    return `This action removes a #${id} atAgent`;
  }
}
