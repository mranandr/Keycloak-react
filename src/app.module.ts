import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingInfo } from './entities/billing-info.entity';
import { BillingInfoController } from './controllers/billing-info.controller';
import { BillingInfoService } from './services/billing-info.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or your preferred database
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      entities: [BillingInfo],
      synchronize: true, // set to false in production
    }),
    TypeOrmModule.forFeature([BillingInfo]),
  ],
  controllers: [BillingInfoController],
  providers: [BillingInfoService],
})
export class AppModule {} 