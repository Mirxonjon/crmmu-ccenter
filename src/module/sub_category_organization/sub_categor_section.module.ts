import { Module } from '@nestjs/common';
import { SubCategorySectionController } from './sub_category_section.controller';
import { SubCategorySectionServise } from './sub_category_section.service';

@Module({
  controllers: [SubCategorySectionController],
  providers: [SubCategorySectionServise],
})
export class SubCategorySectionModule {}
