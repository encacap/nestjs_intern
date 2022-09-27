import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateCatDto {
  readonly name: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  age: number;

  readonly breed: string;
}
