import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
  Body,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { FileInterceptor } from '@nestjs/platform-express';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { multerConfig } from '../multer.config';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CATEGORY_QUEUE } from 'src/constants';

@Crud({
  model: { type: Category },
})
@Controller('category')
export class CategoryController implements CrudController<Category> {
  constructor(
    public service: CategoryService,
    @InjectQueue(CATEGORY_QUEUE) private readonly categoryQueue: Queue,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createCategory(
    @Body() dto: Category,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Category> {
    // Handle image upload to Google Cloud Storage and set the image URL in the dto
    // ...
    const data = await this.service.createCategory(dto, file.filename)
    
    console.log('process category', data);
    await this.categoryQueue.add('category-job', { dto: dto,file: file.filename});
    return data;
  }
}
