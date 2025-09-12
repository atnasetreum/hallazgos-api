import { Injectable } from '@nestjs/common';

import { CreateAtAgentDto, UpdateAtAgentDto } from './dto';

@Injectable()
export class AtAgentsService {
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
