import { isEmpty, get } from 'lodash';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

// others
import { User } from './entities/user.entity';
// import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { SignUpInput } from 'src/auth/dto/inputs/signup.input';

@Injectable()
export class UsersService {
  private logger = new Logger('ItemsService');

  constructor(
    @InjectRepository(User)
    private destinationsRepository: MongoRepository<User>,
  ) {}

  async create(signUpInput: SignUpInput): Promise<User> {
    try {
      const getUser = await this.findOneByEmail(signUpInput.email);

      if (!isEmpty(getUser)) throw new Error('user exists');
      const results = this.destinationsRepository.create(signUpInput);
      return await this.destinationsRepository.save(results);
    } catch (error) {
      this.handleError(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const getUser = await this.destinationsRepository.findOneByOrFail({
        email,
      });
      // if (isEmpty(getUser)) throw new Error('email not exists');
      return getUser;
    } catch (error) {
      this.handleError({
        code: 401,
        detail: 'review email',
      });
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleError(err: any): never {
    if (get(err, 'code') === 401) {
      throw new BadRequestException(err.detail.replace('Key ', ''));
    }
    throw new InternalServerErrorException(
      'service dont work today !  :(',
      err,
    );
  }
}
