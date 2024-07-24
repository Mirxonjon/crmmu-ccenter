import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { Category_Section_Entity } from 'src/entities/category_org.entity';
import { Sub_Category_Section_Entity } from 'src/entities/sub_category_org.entity';
import { ApplicationCallCenterEntity } from 'src/entities/applicationCallCenter.entity';
import { Region_Entity } from 'src/entities/region.entity';
import { District_Entity } from 'src/entities/district.entity';
import { SendedOrganizationEntity } from 'src/entities/sende_organization.entity';
import { HistoryAplicationEntity } from 'src/entities/history.entity';


dotenv.config();

export const connectDb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  password: String(process.env.DB_PASSWORD),
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  entities: [
    UsersEntity,
    Category_Section_Entity,
    Sub_Category_Section_Entity,
    ApplicationCallCenterEntity,
    Region_Entity,
    District_Entity,
    SendedOrganizationEntity,
    HistoryAplicationEntity
  ],
  autoLoadEntities: true,
  synchronize: true,
};
