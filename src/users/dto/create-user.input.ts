import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class CreateUserInput {
  @Column()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
