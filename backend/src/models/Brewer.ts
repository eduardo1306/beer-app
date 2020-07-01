import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
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

  @OneToMany(() => Beer, beer => beer)
  @JoinColumn({
    name: 'beer_id',
  })
  beer: Beer[];

  @Column()
  beer_id: number;

  @OneToMany(() => SocialMedia, socialMedia => socialMedia.brewer)
  @JoinColumn({
    name: 'socialMedia_id',
  })
  socialMedia: SocialMedia[];

  @Column()
  socialMedia_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Brewer;
