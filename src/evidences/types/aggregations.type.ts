import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Evidence } from 'evidences/entities/evidence.entity';

@ObjectType()
export class AggregationsEvidenceType {
  @Field(() => Int)
  count: number;

  @Field(() => [Evidence])
  data: Evidence[];
}
