import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Sub_Category_Section_Entity } from './sub_category_org.entity';
import { District_Entity } from './district.entity';
  
  @Entity()
  export class Region_Entity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
      type: 'character varying',
      nullable: true,
    })
    title: string;
  
  
    @OneToMany(
      () => District_Entity,
      (district) => district.region,
    )
    districts: District_Entity[];
  
    @UpdateDateColumn({ name: 'updated_at' })
    update_date: Date;
  
    @CreateDateColumn({ name: 'created_at' })
    create_data: Date;
  }
  