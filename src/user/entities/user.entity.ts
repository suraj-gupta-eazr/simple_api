import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'name',
    description: 'User Name',
  })
  @Column()
  Name: string;

  @ApiProperty({
    example: 'age',
    description: 'User Age',
  })
  @Column()
  age: number;

  @ApiProperty({
    example: 'address',
    description: 'User address',
  })
  @Column()
  address: string;

  @ApiProperty({
    example: 'phone',
    description: 'User phone',
  })
  @Column()
  phone: string;

  @ApiProperty({
    example: 'email',
    description: 'User email',
  })
  @Column({unique:true})
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'User password',
  })
  @Column()
  password: string;
}
