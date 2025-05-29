import { Controller, Post, Body, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { CreateCheckoutSessionDto } from './DTO/payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-checkout-session')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createCheckoutSession(@Body() createCheckoutSessionDto: CreateCheckoutSessionDto) {
    try {
      const result = await this.paymentsService.createCheckoutSession(createCheckoutSessionDto);
      return {
        status: 'success',
        data: result,
        message: 'Checkout session created successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message || 'Failed to create checkout session',
          timestamp: new Date().toISOString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
