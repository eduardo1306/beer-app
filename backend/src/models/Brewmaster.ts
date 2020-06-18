import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Beer from './Beer';
import SocialMedia from './SocialMedia';

@Entity('brewmaster')
class Brewmaster {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  photo: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @ManyToOne(() => SocialMedia)
  @JoinColumn({ name: 'socialMedia_id' })
  socialMedia: SocialMedia[];

  @ManyToOne(() => Beer)
  @JoinColumn({ name: 'beer_id' })
  beer: Beer[];

  @Column()
  socalMedia_id: number;

  @Column()
  beer_id: number;
}

export default Brewmaster;
