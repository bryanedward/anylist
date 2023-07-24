import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
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

  @Field(() => String)
  @Column()
  email: string;

  @Column()
  @Field(() => String)
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

  @BeforeInsert()
  async beforeInsertActions() {
    this.isActive = true;
    // this.roles = ['user'];
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  @BeforeUpdate()
  async afterUpdate() {
    this.fullName = 'ij';
    console.log('=====');
  }
}
