import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ObjectIdColumn,
  ObjectId,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

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
