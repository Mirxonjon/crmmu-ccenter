import { Module, CacheModuleOptions } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { connectDb } from './config/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { SectionCategoriesModule } from './module/category_org/section_categories.module';
import { SubCategorySectionModule } from './module/sub_category_organization/sub_categor_section.module';
import { ApplicationCallCenterModule } from './module/organization/application_call_center.module';
import { RegionCategoriesModule } from './module/region/region_categories.module';
import { DistrictModule } from './module/dictrict/district.module';
import { AuthModule } from './module/auth/auth.module';
import { SendedOrganizationModule } from './module/sende_organization/sended_organization.module';
import { RolesGuard } from './module/auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: (): CacheModuleOptions => ({
        ttl: 3600000,
      }),
    }),
    AuthModule,
    SectionCategoriesModule,
    SubCategorySectionModule,
    ApplicationCallCenterModule,
    RegionCategoriesModule,
    DistrictModule,
    SendedOrganizationModule,

  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
