import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersServise } from './users.service';
import { AuthServise } from '../auth/auth.service';

@Module({
  controllers: [UsersController],
  providers: [UsersServise, AuthServise],
})
export class UsersModule {}
