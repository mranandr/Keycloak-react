import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { CreateCheckoutSessionDto } from './DTO/payment.dto';
import { CheckoutSession, CheckoutSessionDocument } from './payment.schema';

@Injectable()
export class PaymentsService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-04-30.basil',
  });

  constructor(
    @InjectModel(CheckoutSession.name)
    private checkoutSessionModel: Model<CheckoutSessionDocument>,
  ) {}

  async createCheckoutSession(data: CreateCheckoutSessionDto) {
    try {
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Test Product',
                },
                unit_amount: 1000, // $10.00
              },
              quantity: 1,
            }],
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
          });
          

      // Save to MongoDB
      const checkoutSession = new this.checkoutSessionModel({
        ...data,
        sessionId: session.id,
      });
      await checkoutSession.save();

      return { url: session.url };
    } catch (error) {
      console.error('Stripe createCheckoutSession error:', error);
      throw new InternalServerErrorException('Could not create checkout session');
    }
  }
}
