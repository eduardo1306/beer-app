import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('socialMedia')
class SocialMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  socialMedia_url: string;
}

export default SocialMedia;
