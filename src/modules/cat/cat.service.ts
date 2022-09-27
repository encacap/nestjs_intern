import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatService {
  private readonly cats: Cat[] = [];

  public async createOne(cat: Cat): Promise<Cat> {
    this.cats.push(cat);
    return cat;
  }

  public async findAll(): Promise<Cat[]> {
    return this.cats;
  }

  public async findOneById(id: number): Promise<Cat[]> {
    return this.cats.filter((cat) => cat.age === id);
  }
}
