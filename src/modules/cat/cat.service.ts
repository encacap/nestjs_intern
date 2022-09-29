import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatBreed } from './entities/cat-breed.entity';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
    @InjectRepository(CatBreed) private readonly catBreedRepository: Repository<CatBreed>,
  ) {}

  public async createOne(catBody: CreateCatDto): Promise<Cat> {
    const breed = new CatBreed();

    breed.name = catBody.breed.name;
    breed.description = catBody.breed.description;

    await this.catBreedRepository.save(breed);

    const cat = new Cat();

    cat.name = catBody.name;
    cat.age = catBody.age;
    cat.breed = breed;

    const savedCat = await this.catRepository.save(cat);

    return savedCat;
  }

  public async findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  public async findOneById(id: number): Promise<Cat> {
    return this.catRepository.findOneBy({ id });
  }
}
