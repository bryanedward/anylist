import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { Column } from 'typeorm';

@ObjectType({ isAbstract: true })
export class AuthResponse {
  @Column()
  @Field(() => String)
  token: string;

  @Column()
  @Field()
  @Type(() => User)
  user: User;
}
