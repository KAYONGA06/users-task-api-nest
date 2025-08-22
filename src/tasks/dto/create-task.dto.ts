import { IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  userId: number;

  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

