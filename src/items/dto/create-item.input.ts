import { InputType, Field, ObjectType, Float } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class CreateItemInput {
  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Float, { description: 'quantity product' })
  quantity: number;

  @Column()
  @Field(() => String)
  quantityUnits: string;
}
