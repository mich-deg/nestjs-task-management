import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
// import * as uuid from 'uuid/v1';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskByID(id: string): Task {
    const taskFound = this.tasks.find((task) => task.id === id);

    if (!taskFound) {
      throw new NotFoundException(`Task with Id "${id}" not found.`);
    }
    return taskFound;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      //install uuid package --> npm install --save uuid || yarn add uuid
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  deleteTask(id: string): void {
    const taskFound = this.getTaskByID(id);
    this.tasks = this.tasks.filter((task) => task.id !== taskFound.id);
  }
  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskByID(id);
    task.status = status;
    return task;
  }
}
