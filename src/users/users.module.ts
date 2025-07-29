import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
   imports: [TypeOrmModule.forFeature([User])],
   exports: [UsersService],
})
export class UsersModule {}
