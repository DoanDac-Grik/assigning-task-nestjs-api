import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Status } from '../constants/work.consant';

export class CreateWorkDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  description: string;
}

export class UpdateWorkDto {
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsEnum(Status)
  status: string;
  @IsOptional()
  tasks: string[];
}
