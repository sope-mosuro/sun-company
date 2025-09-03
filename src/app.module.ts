import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Agent } from 'http';
import { AgentsModule } from './agents/agents.module';
import { SalesModule } from './sales/sale.module'; // Import SaleModule
import { ReportsModule } from './reports/reports.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // to access env variables
      TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Set to false in production!
    }), AuthModule, UsersModule, AgentsModule,SalesModule, ReportsModule, // Ensure SaleModule is imported
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
