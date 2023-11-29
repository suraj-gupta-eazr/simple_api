import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
      example: 'name',
      description: 'Category Name',
    })
    @Column()
    Name: string;

    @ApiProperty({
      example: 'description',
      description: 'Category Description',
    })
    @Column()
    description: string;

    @ApiProperty({
      example: 'image',
      description: 'Category Image',
    })
    @Column()
    image: string;

    @ApiProperty({
      example: false,
      description: 'active or not',
    })
    @Column({default:false})
    isActive: boolean;
}
