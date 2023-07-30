import {
  InputType,
  Field,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column } from 'typeorm';

class UpdateCatDto extends PartialType(
  PickType(User, ['fullName', '_id', 'email', 'isActive'] as const),
) {}

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class LogUserInput {
  @Column()
  @Field(() => String, { description: '' })
  fullName: string;

  @Field(() => UpdateCatDto)
  @Column()
  user: UpdateCatDto;
}
