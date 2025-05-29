import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CheckoutSessionDocument = CheckoutSession & Document;

@Schema({ timestamps: true })
export class CheckoutSession {
  @Prop({ required: true })
  currentUser: string;

  @Prop({ required: true })
  plan: string;

  @Prop({ required: true })
  isYearly: boolean;

  @Prop({ required: true })
  extraScans: number;

  @Prop({ required: true })
  totalScans: number;

  @Prop({ required: true })
  totalAmount: number;

  @Prop()
  sessionId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CheckoutSessionSchema = SchemaFactory.createForClass(CheckoutSession);
