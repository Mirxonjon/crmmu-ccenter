import { Module } from '@nestjs/common';
import { SectionCategoriesController } from './section_categories.controller';
import { SectionCategoriesService } from './section_categories.service';

@Module({
  controllers: [SectionCategoriesController],
  providers: [SectionCategoriesService],
})
export class SectionCategoriesModule {}
