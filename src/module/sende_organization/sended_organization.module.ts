import { Module } from '@nestjs/common';
import { SendedOrganizationController } from './sended_organization.controller';
import { SendedOrganizationService } from './sended_organization.service';

@Module({
  controllers: [SendedOrganizationController],
  providers: [SendedOrganizationService],
})
export class SendedOrganizationModule {}
