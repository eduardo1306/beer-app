import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import Brewer from './Brewer';

@Entity('socialMedia')
class SocialMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  socialMedia_url: string;

  @ManyToOne(() => Brewer)
  brewer: Brewer;
}

export default SocialMedia;
