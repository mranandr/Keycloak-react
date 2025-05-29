import { ConfigService as NestConfigService } from '@nestjs/config';
export declare class ConfigService {
    private readonly configService;
    constructor(configService: NestConfigService);
    get port(): number;
    get mongoUri(): string;
    get sentryDsn(): string | undefined;
}
