import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get port(): number {
    // Use non-null assertion because Joi validation ensures PORT exists
    return this.configService.get<number>('PORT')!;
  }

  get mongoUri(): string {
    return this.configService.get<string>('MONGO_URI')!;
  }

  get sentryDsn(): string | undefined {
    // Optional env var, so no assertion needed
    return this.configService.get<string>('SENTRY_DSN');
  }
}
