import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsService } from './clients.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // use env var for secret
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
