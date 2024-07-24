import { Module } from '@nestjs/common';
import { DistrictController } from './district.controller';
import { DistrictServise } from './district.service';

@Module({
  controllers: [DistrictController],
  providers: [DistrictServise],
})
export class DistrictModule {}
