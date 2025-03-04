// magazine.entity.ts
import { Publisher } from '../../publisher/entities/publisher.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Magazine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  issueNumber: string;

  @ManyToOne(() => Publisher, (publisher) => publisher.magazines)
  publisher: Publisher;
}
