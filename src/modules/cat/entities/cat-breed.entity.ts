import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cat } from './cat.entity';

@Entity({
  name: 'cat_breeds',
})
export class CatBreed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => Cat, (cat) => cat.breed)
  cat: Cat;
}
