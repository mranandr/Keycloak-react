import { PaymentsService } from './payment.service';
import { CreateCheckoutSessionDto } from './DTO/payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createCheckoutSession(createCheckoutSessionDto: CreateCheckoutSessionDto): Promise<{
        status: string;
        data: {
            url: string | null;
        };
        message: string;
    }>;
}
