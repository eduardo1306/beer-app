import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Brewer from '@modules/brewer/infra/typeorm/entities/Brewer';

@Entity('beer')
class Beer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(() => Brewer)
  @JoinColumn({ name: 'brewer_id' })
  brewer: Brewer;

  @Column()
  brewer_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Beer;
