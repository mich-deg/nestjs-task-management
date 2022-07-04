import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
    return found;
  }

  // getTaskByID(id: string): Task {
  //   const taskFound = this.tasks.find((task) => task.id === id);
  //   if (!taskFound) {
  //     throw new NotFoundException(`Task with Id "${id}" not found.`);
  //   }
  //   return taskFound;
  // }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    // const { title, description } = createTaskDto;

    // const task = new Task();
    // task.title = title;
    // task.description = description;
    // task.status = TaskStatus.OPEN;
    // await task.save();

    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    // console.log(result);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
