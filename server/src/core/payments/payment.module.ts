import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';
import { CheckoutSession, CheckoutSessionSchema } from './payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CheckoutSession.name, schema: CheckoutSessionSchema },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
