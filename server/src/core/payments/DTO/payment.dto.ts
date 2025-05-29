import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class CreateCheckoutSessionDto {
  @IsString()
  @IsNotEmpty()
  currentUser: string;

  @IsString()
  @IsNotEmpty()
  plan: string;

  @IsBoolean()
  @IsNotEmpty()
  isYearly: boolean;

  @IsNumber()
  @IsNotEmpty()
  extraScans: number;

  @IsNumber()
  @IsNotEmpty()
  totalScans: number;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;
}
