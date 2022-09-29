import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { CatBreed } from '../entities/cat-breed.entity';

export class CreateCatDto {
  readonly name: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  age: number;

  @IsString()
  @Exclude({ toPlainOnly: true })
  breedName: string;

  @IsString()
  @Exclude({ toPlainOnly: true })
  breedDescription: string;

  @Expose({ name: 'breed' })
  get breed(): CatBreed {
    const breed = new CatBreed();

    breed.name = this.breedName;
    breed.description = this.breedDescription;

    return breed;
  }
}
