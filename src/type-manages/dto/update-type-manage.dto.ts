import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeManageDto } from './create-type-manage.dto';

export class UpdateTypeManageDto extends PartialType(CreateTypeManageDto) {}
