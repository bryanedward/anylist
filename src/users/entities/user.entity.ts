import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  FindOneAndReplaceOptions,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
  AfterLoad,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BeforeFindOne } from '@nestjs-query/query-graphql';

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
