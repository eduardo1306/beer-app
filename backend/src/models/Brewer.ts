import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Beer from './Beer';
import SocialMedia from './SocialMedia';

@Entity('brewer')
class Brewer {
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

  @OneToMany(() => SocialMedia, socialMedia => socialMedia.brewer)
  @JoinColumn({
    name: 'socialMedia_id',
  })
  socialMedia: SocialMedia[];

  @OneToMany(() => Beer, beer => beer.brewer)
  @JoinColumn({ name: 'beer_id' })
  beer: Beer[];

  @Column()
  beer_id: number;

  @Column()
  socialMedia_id: number;
}

export default Brewer;
