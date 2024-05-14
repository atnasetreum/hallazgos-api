import { Query, Resolver } from '@nestjs/graphql';

import { Evidence } from './entities/evidence.entity';

@Resolver(Evidence)
export class EvidencesResolver {
  //constructor(private readonly evidencesService: EvidencesService) {}

  /*@Query(() => AggregationsEvidenceType, { name: 'evidences' })
  findAll(@Args() paramsArgs: ParamsArgs): Promise<{
    data: Evidence[];
    count: number;
  }> {
    return this.evidencesService.findAll(paramsArgs);
  }*/

  @Query(() => String, { name: 'evidences' })
  findAll() {
    return 'hola mundo';
  }
}
