import {
  Field,
  Float,
  ID,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ObjectIdColumn,
  ObjectId,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

export class UserDto extends PartialType(
  PickType(User, ['fullName', '_id', 'email', 'isActive'] as const),
) {}

@Entity('Item')
@ObjectType()
export class Item extends BaseEntity {
  @ObjectIdColumn()
  @Field(() => ID)
  _id: ObjectId;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  name?: string;

  @Column()
  @Field(() => Float)
  quantity: number;

  @Column()
  @Field(() => String)
  quantityUnits: string;

  @Column([{ type: mongoose.Schema.Types.ObjectId, ref: User.name }])
  user: UserDto;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

// @AfterInsert()
// updateData() {
//   console.log(
//     '🚀 ~ file: item.entity.ts:34 ~ Item ~ validateInsert ~ data:',
//     this,
//   );
// }
