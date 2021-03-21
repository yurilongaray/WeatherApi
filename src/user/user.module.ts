import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserRepository],
  controllers: [UserController]
})
export class UserModule {}
