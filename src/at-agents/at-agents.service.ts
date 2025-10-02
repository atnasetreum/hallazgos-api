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

  create(createAtAgentDto: CreateAtAgentDto) {
    return this.atAgentRepository.save(createAtAgentDto);
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
