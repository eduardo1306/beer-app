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
  whatsapp: string;

  @Column()
  password: string;

  @Column()
  photo: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @ManyToOne(() => SocialMedia, socialMedia => socialMedia.brewmaster)
  @JoinColumn({ name: 'socialMedia_id' })
  socialMedia: SocialMedia[];

  @ManyToOne(() => Beer, beer => beer.brewmaster)
  @JoinColumn({ name: 'beer_id' })
  beer: Beer[];
}

export default Brewmaster;
