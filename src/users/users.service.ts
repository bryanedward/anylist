import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { SignUpInput } from 'src/auth/dto/inputs/signup.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MongoRepository } from 'typeorm';
import { isEmpty } from 'lodash';

@Injectable()
export class UsersService {
  private logger = new Logger('ItemsService');

  constructor(
    @InjectRepository(User)
    private destinationsRepository: MongoRepository<User>,
  ) {}

  async create(signUpInput: SignUpInput): Promise<User> {
    try {
      const getUser = await this.findOne(signUpInput.email);

      if (!isEmpty(getUser)) throw new Error('user exists');
      const results = this.destinationsRepository.create(signUpInput);
      return await this.destinationsRepository.save(results);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('service dont work today !  :(');
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string): Promise<User> {
    const results = await this.destinationsRepository.findOneBy({
      email,
    });

    return results;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: number) {
    return `This action removes a #${id} user`;
  }
}
