import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Brewer from './Brewer';

@Entity('beer')
class Beer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  coloring: string;

  @Column()
  ibu: string;

  @Column()
  description: string;

  @ManyToOne(() => Brewer, brewer => brewer.beer)
  brewer: Brewer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Beer;
