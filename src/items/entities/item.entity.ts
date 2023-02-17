import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;
  @Column()
  quantity: number;
  @Column()
  quantityUnits: string;
}
