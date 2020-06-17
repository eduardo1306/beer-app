import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

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

  socialMedia_id: number;

  beer_id: number;
}

export default Brewmaster;
