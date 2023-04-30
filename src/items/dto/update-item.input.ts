import { Type } from 'class-transformer';
import { CreateItemInput } from './create-item.input';
import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class UpdateItemInput {
  @Field()
  @Type(() => CreateItemInput)
  item: CreateItemInput;
}
