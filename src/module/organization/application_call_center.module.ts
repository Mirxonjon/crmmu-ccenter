import { Module } from '@nestjs/common';
import { ApplicationCallCenterController } from './application_call_center.controller';
import { ApplicationCallCenterServise } from './application_call_center.service';

@Module({
  controllers: [ApplicationCallCenterController],
  providers: [ApplicationCallCenterServise],
})
export class ApplicationCallCenterModule {}
