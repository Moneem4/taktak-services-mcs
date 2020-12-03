import { Controller, NotFoundException, Get, Param, Post, Body, BadRequestException, Put, Delete, HttpCode } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Task } from '../models/Task.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Taskservice } from 'src/services/task.service';

@Controller('task')
export class TaskController {
    constructor(
        @InjectRepository(Task)
        private readonly taskService:Taskservice,
    ) { }

    @MessagePattern('getTasks')
    async getTasks(): Promise<Task[]> {
        return await this.taskService.getTasks();
    }

    @MessagePattern('getTaskbyId')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getTaskbyId(@Param('id') id): Promise<Task> {
        return  await this.taskService.getTaskById(id);
       
    }

    @MessagePattern('createTask')
    async createTask(@Body() task: Partial<Task>): Promise<Task> {
        return this.taskService.createTask(task);
    }

    @MessagePattern('updateTask')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateTask( @Body() task: Partial<Task>): Promise<Task> {
       return this.taskService.updateTask(task);
    }
    @MessagePattern('deleteTask')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async deleteTask(@Payload() id:any): Promise<boolean> {
       return this.taskService.deleteTask(id);
}
}