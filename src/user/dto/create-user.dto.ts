import {IsNumber, IsString} from 'class-validator'

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  age: number;

  @IsString()
  address: string;

  @IsNumber()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
