import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import Brewer from './Brewer';

@Entity('socialMedia')
class SocialMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Brewer, brewer => brewer.socialMedia)
  brewer: Brewer;
}

export default SocialMedia;
