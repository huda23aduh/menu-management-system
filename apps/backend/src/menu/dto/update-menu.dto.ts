import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}
