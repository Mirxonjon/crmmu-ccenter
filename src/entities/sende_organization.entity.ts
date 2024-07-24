import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { ApplicationCallCenterEntity } from './applicationCallCenter.entity';

  @Entity()
  export class SendedOrganizationEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
      type: 'character varying',
      nullable: true,
    })
    title: string;


    @OneToMany(
      () => ApplicationCallCenterEntity,
      (application) => application.seded_to_Organization,
    )
    applicationCallcenter: ApplicationCallCenterEntity[];
  
    @UpdateDateColumn({ name: 'updated_at' })
  update_date: Date;
  
    @CreateDateColumn({ name: 'created_at' })
    create_data: Date;
  
  }
  