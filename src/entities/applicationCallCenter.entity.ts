import { SendedOrganizationEntity } from 'src/entities/sende_organization.entity';
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
import { Sub_Category_Section_Entity } from './sub_category_org.entity';
import { District_Entity } from './district.entity';
import { UsersEntity } from './users.entity';
import { HistoryAplicationEntity } from './history.entity';

@Entity()
export class ApplicationCallCenterEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  applicant: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  application_type: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  comment: string;

  // @Column({
  //   type: 'character varying',
  //   nullable: true,
  // })
  // crossfields: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  income_date: string;

  // @Column({
  //   type: 'character varying',
  //   nullable: true,
  // })
  // income_number: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  incoming_number: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  organization_name: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  organization_type: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  perform_date: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  performer: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  resend_application: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  response: string;

  @Column({
    type: 'character varying',
    default: 'false',
    nullable :true
  })
  IsDraf: string;

  @ManyToOne(
    () => Sub_Category_Section_Entity,
    (sub_category_org) => sub_category_org.applicationCallcenter,
    {nullable :true , onDelete: 'CASCADE'}
  )
  sub_category_call_center: Sub_Category_Section_Entity;

  @ManyToOne(
    () => District_Entity,
    (districts) => districts.applicationCallcenterIndistrict,
    { nullable: true },
  )
  districts: District_Entity;

  @ManyToOne(
    () => UsersEntity,
    (user) => user.applicationCallCenter,
    { nullable: true },
  )
  user: UsersEntity;

  @ManyToOne(
    () => SendedOrganizationEntity,
    (user) => user.applicationCallcenter,
    { nullable: true },
  )
  seded_to_Organization: SendedOrganizationEntity;


  
  @OneToMany(
    () => HistoryAplicationEntity,
    (history) => history.applicationCallCenter,
  )
  history: HistoryAplicationEntity[];

  // @OneToMany(
  //   () => Picture_Organization_Entity,
  //   (picture) => picture.organization_id,
  // )
  // pictures: Picture_Organization_Entity[];

  // @OneToMany(() => CommentAndRateEntity, (comment) => comment.organization_id)
  // comments: CommentAndRateEntity[];

  // @OneToMany(
  //   () => Saved_Organization_Entity,
  //   (saved_org) => saved_org.organization_id,
  // )
  // saved_organization: Saved_Organization_Entity[];

  @UpdateDateColumn({ name: 'updated_at' })
  update_date: Date;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;
}
