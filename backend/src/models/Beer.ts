import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Brewmaster from './Brewmaster';

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

  @OneToMany(() => Brewmaster, brewmaster => brewmaster.beer)
  brewmaster: Brewmaster;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Beer;
