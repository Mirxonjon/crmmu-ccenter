import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { ApplicationCallCenterEntity } from './applicationCallCenter.entity';
import { UsersEntity } from './users.entity';
  
  @Entity()
  export class HistoryAplicationEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
      type: 'character varying',
      nullable: true,
    })
    action: string;

    @ManyToOne(
        () => ApplicationCallCenterEntity,
        (application) => application.history,
        { nullable: true },
      )
    applicationCallCenter: ApplicationCallCenterEntity;


    
  @ManyToOne(
    () => UsersEntity,
    (user) => user.history,
    { nullable: true },
  )
  user_history: UsersEntity;
  
    @CreateDateColumn({ name: 'created_at' })
    create_data: Date;
  
  }
  