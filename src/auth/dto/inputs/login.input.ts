import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';
import { Column } from 'typeorm';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class LoginInput {
  @Column()
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column()
  @Field(() => String)
  @MinLength(5)
  password: string;
}
