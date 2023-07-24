import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('Logs')
@ObjectType()
export class LogUser {
  @ObjectIdColumn()
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => String)
  @Column()
  id_usuario: string;
}
