import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // ✅ Create a new task
  async create(createTaskDto: CreateTaskDto) {
    const { userId, ...taskData } = createTaskDto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const task = this.tasksRepository.create({
      ...taskData,
      user,
      status: taskData.status || TaskStatus.PENDING,
    });

    return this.tasksRepository.save(task);
  }

  // ✅ Get all tasks
  findAll() {
    return this.tasksRepository.find({ relations: ['user'] });
  }

  // ✅ Get a single task by ID
  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  // ✅ Update a task
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  // ✅ Delete a task
  async remove(id: number) {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.tasksRepository.remove(task);
    return { deleted: true };
  }
}
