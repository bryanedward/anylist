import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';

class User {
  @Field(() => String)
  _id: string;
  name: string;
}

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class LogUserInput {
  @Column()
  @Field(() => String, { description: 'Example field (placeholder)' })
  id_usuario: string;

  @Field(() => [User])
  user: User;
}
