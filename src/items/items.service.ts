import { Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'bson';
import { UpdateItemInput } from './dto/update-item.input';

@Injectable()
export class ItemsService {
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
      return results;
    } catch (error) {
      console.log('Error ===', error);
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
}
