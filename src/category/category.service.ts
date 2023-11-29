// src/categories/category.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Queue } from 'bull';
import { CATEGORY_QUEUE } from 'src/constants';

@Injectable()
export class CategoryService extends TypeOrmCrudService<Category> {
  constructor(
    @InjectRepository(Category) repo: Repository<Category>,
    // @Inject(CATEGORY_QUEUE) private readonly categoryQueue: Queue,
  ) {
    super(repo);
    this.repo = repo;
  }

  async createCategory(user: CreateCategoryDto, path: string) {
    const { Name, description, isActive } = user;
    const data = await this.repo.save({
      Name,
      description,
      image: path,
      isActive,
    });
    
    return data;
  }
}
