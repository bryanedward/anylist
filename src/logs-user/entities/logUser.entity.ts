import { ObjectType, Field, ID, PickType, PartialType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ObjectId, ObjectIdColumn, OneToMany } from 'typeorm';

export class UpdateCatDto extends PartialType(
  PickType(User, ['fullName', '_id', 'email', 'isActive'] as const),
) {}

@Entity('Logs')
@ObjectType({ description: 'ok' })
export class Logs {
  @ObjectIdColumn()
  @Field(() => ID)
  _id: ObjectId;

  @Column()
  @Field(() => String, { defaultValue: 'k' })
  fullname: string;

  @Field(() => User)
  @Column()
  userLogs: User;

  @OneToMany(() => User, (product) => product._id)
  @Field(() => [User])
  usermodify: User[];
}
