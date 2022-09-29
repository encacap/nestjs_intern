import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CatBreed } from './cat-breed.entity';

enum CatGender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity({
  name: 'cats',
})
export class Cat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({
    type: 'enum',
    enum: CatGender,
    default: CatGender.MALE,
  })
  gender: CatGender;

  @OneToOne(() => CatBreed, (catBreed) => catBreed.cat)
  @JoinColumn()
  breed: CatBreed;
}
