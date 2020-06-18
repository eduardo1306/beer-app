import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import Brewmaster from './Brewmaster';

@Entity('socialMedia')
class SocialMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Brewmaster, brewmaster => brewmaster.socialMedia)
  brewmaster: Brewmaster;
}

export default SocialMedia;
