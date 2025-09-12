import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AssociatedTasksController } from './associated-tasks.controller';
import { AssociatedTasksService } from './associated-tasks.service';
import { AssociatedTask } from './entities/associated-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssociatedTask])],
  controllers: [AssociatedTasksController],
  providers: [AssociatedTasksService],
})
export class AssociatedTasksModule {}
