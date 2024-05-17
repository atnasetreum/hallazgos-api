import { Args, Query, Resolver } from '@nestjs/graphql';

import { Evidence } from './entities/evidence.entity';
import { EvidencesService } from './evidences.service';
import { AggregationsEvidenceType } from './types';
import { ParamsArgs } from './inputs/args';

@Resolver(Evidence)
export class EvidencesResolver {
  constructor(private readonly evidencesService: EvidencesService) {}

  @Query(() => AggregationsEvidenceType, { name: 'evidences' })
  findAll(@Args() paramsArgs: ParamsArgs): Promise<{
    data: Evidence[];
    count: number;
  }> {
    return this.evidencesService.findAllGraphql(paramsArgs);
  }
}
