import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}
