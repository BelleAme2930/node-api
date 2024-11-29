import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter?: any,
  ): Promise<Task[]> {
    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    if (filter?.status) {
      queryBuilder.andWhere('task.status = :status', { status: filter.status });
    }

    if (filter?.priority) {
      queryBuilder.andWhere('task.priority = :priority', {
        priority: filter.priority,
      });
    }

    return await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  async findOne(id: number): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<Task> {
    await this.taskRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async findFirst(): Promise<Task | null> {
    return this.taskRepository.findOne({
      order: { createdAt: 'ASC' },
    });
  }
}
