import { Module } from '@nestjs/common';
import { RegionCategoriesController } from './region_categories.controller';
import { RegionCategoriesService } from './region_categories.service';

@Module({
  controllers: [RegionCategoriesController],
  providers: [RegionCategoriesService],
})
export class RegionCategoriesModule {}
