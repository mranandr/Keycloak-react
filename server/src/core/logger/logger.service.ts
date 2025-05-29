import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  log(message: string) {
    this.logger.info(message);
    console.log('[LOG]:', message);
  }
}