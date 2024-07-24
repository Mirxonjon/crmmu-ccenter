import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationCallCenterEntity } from './applicationCallCenter.entity';
import { HistoryAplicationEntity } from './history.entity';

@Entity()
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  full_name: string;
  @Column({
    type: 'character varying',
    nullable: true,
  })
  operator_number: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  username: string;

  @Column({
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'character varying',
    default: 'operator',
  })
  role: string;

  @OneToMany(() => ApplicationCallCenterEntity, (applicationCallcenter) => applicationCallcenter.user)
  applicationCallCenter: ApplicationCallCenterEntity[];
  
  @OneToMany(
    () => HistoryAplicationEntity,
    (history) => history.user_history,
  )
  history: HistoryAplicationEntity[];

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;

}
