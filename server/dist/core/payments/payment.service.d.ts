import { Model } from 'mongoose';
import { CreateCheckoutSessionDto } from './DTO/payment.dto';
import { CheckoutSessionDocument } from './payment.schema';
export declare class PaymentsService {
    private checkoutSessionModel;
    private stripe;
    constructor(checkoutSessionModel: Model<CheckoutSessionDocument>);
    createCheckoutSession(data: CreateCheckoutSessionDto): Promise<{
        url: string | null;
    }>;
}
