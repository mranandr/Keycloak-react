import { JwtService } from '@nestjs/jwt';
export declare class ClientsService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateToken(clientId: string): {
        token: string;
    };
}
