import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatEntity } from './entities/cat.entity';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatService {
  constructor(@InjectRepository(CatEntity) private readonly catRepository: Repository<CatEntity>) {}

  public async createOne(cat: Cat): Promise<Cat> {
    return this.catRepository.create(cat);
  }

  public async findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  public async findOneById(id: number): Promise<Cat> {
    return this.catRepository.findOneBy({ id });
  }
}
