import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('Users')
@ObjectType()
export class Adress {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
}

@Entity('Users')
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => String, { defaultValue: 'email no exist' })
  @Column()
  email: string;

  @Column()
  @Field(() => String, { defaultValue: 'fullName no exist' })
  fullName: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => [Adress])
  roles: [Adress];

  @Column()
  @Field(() => [Adress])
  address: Adress;

  @Column({
    type: 'boolean',
    default: true,
  })
  @Field(() => Boolean)
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @ManyToOne(() => LogUser, (order) => order._id)
  // order: LogUser;

  @BeforeInsert()
  async beforeInsertActions() {
    this.isActive = true;
    console.log('==== after insert');

    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    this.roles = [
      {
        id: 1,
        name: 'admin',
      },
    ];
  }
}
