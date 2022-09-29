import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CatBreed } from './cat-breed.entity';

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

  @OneToOne(() => CatBreed, (catBreed) => catBreed.cat)
  @JoinColumn()
  breed: CatBreed;
}
