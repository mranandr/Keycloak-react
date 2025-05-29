import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ClientsService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(clientId: string) {
    const payload = { sub: clientId };
    const token = this.jwtService.sign(payload);
    console.log(`[CLIENT TOKEN] ${token}`);
    return { token };
  }
}
