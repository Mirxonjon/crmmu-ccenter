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

@Entity()
export class Sub_Category_Section_Entity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  title: string;


  @ManyToOne(
    () => Category_Section_Entity,
    (category_org) => category_org.sub_category_orgs,
    {nullable :true , onDelete: 'CASCADE'}
  )
  category_org: Category_Section_Entity;

  @OneToMany(
    () => ApplicationCallCenterEntity,
    (org) => org.sub_category_call_center,
    {nullable :true,onDelete: 'CASCADE'}
  )
  applicationCallcenter: ApplicationCallCenterEntity[];



  @UpdateDateColumn({ name: 'updated_at' })
  update_date: Date;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;
}
