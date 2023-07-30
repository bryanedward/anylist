import { isEmpty, get } from 'lodash';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'bson';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

// others
import { User } from './entities/user.entity';
import { SignUpInput } from 'src/auth/dto/inputs/signup.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LogsUserService } from 'src/logs-user/logs-user.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>, //
    private logUserSerive: LogsUserService,
  ) {}

  async create(signUpInput: SignUpInput): Promise<User> {
    try {
      const getUser = await this.findOneByEmail(signUpInput.email);

      if (!isEmpty(getUser)) throw new Error('user exists');
      const results = this.userRepository.create(signUpInput);
      return await this.userRepository.save(results);
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(rol: any): Promise<User[]> {
    try {
      // Query users with photos of size less than 500
      const getUser = await this.userRepository.find({
        'roles.name': {
          $in: rol,
        },
      });
      return getUser;
    } catch (error) {}
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const getUser = await this.userRepository.findOneBy({
        email: email,
      });
      return getUser;
    } catch (error) {
      this.handleError({
        code: 401,
        detail: 'check email',
      });
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({
        _id: new ObjectId(id),
      });
    } catch (error) {
      throw new NotFoundException('not found');
    }
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  async block(
    id: string,
    updateUserInput: UpdateUserInput,
    user: User,
  ): Promise<any> {
    try {
      const data = await this.userRepository.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            fullName: updateUserInput.fullName,
            isActive: false,
          },
        },
      );

      if (!isEmpty(data.value)) {
        await this.logUserSerive.create({
          fullName: updateUserInput.fullName,
          user: {
            _id: new ObjectId(user._id),
            fullName: user.fullName,
            email: user.email,
            isActive: user.isActive,
          },
        });
      }

      return data.value;
    } catch (error) {
      console.log(
        '🚀 ~ file: users.service.ts:98 ~ UsersService ~ error:',
        error,
      );
    }
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
