import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/users/user.module';
import { PaymentsModule } from './core/payments/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI', { infer: true });

        if (!uri) {
          throw new Error('❌ MONGO_URI is not defined in .env');
        }

        Logger.log(`🟡 Connecting to MongoDB...`, 'MongoDB');

        return {
          uri,
          connectionFactory: (connection) => {
            Logger.log('✅ MongoDB connected successfully', 'MongoDB');
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),

    UserModule,
    PaymentsModule, 
  ]
})
export class AppModule {}
