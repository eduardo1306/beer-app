import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('brewer_tokens')
class BrewerToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated()
  @Column('uuid')
  token: string;

  @Column('uuid')
  brewer_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BrewerToken;
