import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { CATEGORY_QUEUE } from 'src/constants';

@Processor(CATEGORY_QUEUE)
export class CategoryConsumer {
  @Process('category-job')
  handleTranscode(job: Job) {
    console.log('Start Category Creating ...');
    console.log(job.data);
    console.log('completed!!');
  }
}
