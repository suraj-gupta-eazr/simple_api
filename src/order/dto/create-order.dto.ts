import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 'first name',
  })
  @IsNumber()
  userId: number;

  @IsString()
  name: string;
}
