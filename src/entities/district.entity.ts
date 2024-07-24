import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Category_Section_Entity } from './category_org.entity';
  import { ApplicationCallCenterEntity } from './applicationCallCenter.entity';
import { Region_Entity } from './region.entity';
  
  @Entity()
  export class District_Entity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
      type: 'character varying',
      nullable: true,
    })
    title: string;
  
    // @Column({
    //   type: 'character varying',
    //   nullable: true,
    // })
    // title_ru: string;
  
    // @Column({
    //   type: 'character varying',
    //   nullable: true,
    // })
    // title_en: string;
  
    @ManyToOne(
      () => Region_Entity,
      (region) => region.districts,
      { nullable: true },
    )
    region: Category_Section_Entity;
  
    @OneToMany(
      () => ApplicationCallCenterEntity,
      (applicationCallCenter) => applicationCallCenter.districts,
    )
    applicationCallcenterIndistrict: ApplicationCallCenterEntity[];
  

  
    @UpdateDateColumn({ name: 'updated_at' })
    update_date: Date;
  
    @CreateDateColumn({ name: 'created_at' })
    create_data: Date;
  }
  