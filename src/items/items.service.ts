import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'bson';
import { UpdateItemInput } from './dto/update-item.input';
import { isNil } from 'lodash';

@Injectable()
export class ItemsService {
  private logger = new Logger('ItemsService');
  constructor(
    @InjectRepository(Item)
    private destinationsRepository: MongoRepository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    try {
      const newItem = this.destinationsRepository.create(createItemInput);
      return await this.destinationsRepository.save(newItem);
    } catch (error) {
      console.log('Error ===', error);
    }
  }

  async findAll(): Promise<Item[]> {
    try {
      const results = await this.destinationsRepository.find({});
      return results;
    } catch (error) {
      console.log('Error ===', error);
    }
  }

  async findOne(id: string) {
    try {
      const results = await this.destinationsRepository.findOne({
        where: {
          _id: new ObjectId(id),
        },
      });

      if (isNil(results)) throw new Error('item doesnt found');
      return results;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, { item }: UpdateItemInput) {
    const results = await this.destinationsRepository.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: item,
      },
    );

    return results;
  }

  async remove(id: string) {
    const results = await this.destinationsRepository.findOneAndDelete({
      _id: new ObjectId(id),
    });
    return results.value;
  }

  private handleError(err: any): never {
    this.logger.error(err);
    throw new InternalServerErrorException(
      'service dont work today !  :(',
      err,
    );
  }
}
