import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';

@Resolver('Item')
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemsService.create(createItemInput);
  }

  @Query(() => [Item])
  async findAll() {
    const results = await this.itemsService.findAll();
    return results;
  }

  @Query(() => Item, { name: 'findItem' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Item> {
    const results = await this.itemsService.findOne(id);
    return results;
  }

  @Mutation(() => Item)
  async updateItem(
    @Args('_id')
    _id: string,
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
  ): Promise<Item> {
    const results = await this.itemsService.update(_id, updateItemInput);

    return results.value;
  }

  @Mutation(() => Item)
  async removeItem(@Args('id', { type: () => ID }) id: string): Promise<Item> {
    const results = await this.itemsService.remove(id);

    return results;
  }
}
