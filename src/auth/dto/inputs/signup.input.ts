import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column } from 'typeorm';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class SignUpInput {
  @Column()
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column()
  @Field(() => String)
  @IsNotEmpty()
  fullName: string;

  @Column()
  @Field(() => String)
  @MinLength(5)
  password: string;
}
