import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks.entity';

export class UpdateTaskDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}

