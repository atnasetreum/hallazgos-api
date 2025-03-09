import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TypeManagesController } from './type-manages.controller';
import { TypeManagesService } from './type-manages.service';
import { TypeManage } from './entities/type-manage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeManage])],
  controllers: [TypeManagesController],
  providers: [TypeManagesService],
  exports: [TypeOrmModule, TypeManagesService],
})
export class TypeManagesModule {}
