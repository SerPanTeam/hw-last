// publisher.entity.ts
import { Magazine } from '../../magazine/entities/magazine.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToMany(() => Magazine, (magazine) => magazine.publisher)
  magazines: Magazine[];
}
