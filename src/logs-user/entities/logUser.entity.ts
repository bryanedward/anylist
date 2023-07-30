import {
  ObjectType,
  Field,
  ID,
  PickType,
  PartialType,
  OmitType,
} from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

export class UpdateCatDto extends PartialType(
  PickType(User, ['fullName', '_id', 'email', 'isActive'] as const),
) {}

@Entity('Logs')
@ObjectType()
export class LogUser {
  @ObjectIdColumn()
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => String)
  fullname: string;

  @Field(() => UpdateCatDto)
  @Column()
  userlogs: UpdateCatDto;
}
