import { Controller, NotFoundException, Get, Param, Post, Body, BadRequestException, Put, Delete, HttpCode } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EventTeamTask } from '../models/EventTeamTask.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventTeamTaskervice } from 'src/services/eventTeamTask.service';

@Controller('eventTeamTask')
export class EventTeamTaskController {
    constructor(
        @InjectRepository(EventTeamTask)
        private readonly EventTeamTaskService:EventTeamTaskervice
    ) { }

    @MessagePattern('getEventTeamTasks')
    async getEventTeamTasks(): Promise<EventTeamTask[]> {
        return await this.EventTeamTaskService.getEventTeamTasks();
    }

    @MessagePattern('getEventTeamTaskbyId')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getEventTeamTaskById(@Param('id') id): Promise<EventTeamTask> {
        return await this.EventTeamTaskService.getEventTeamTaskById(id)
    }

    @MessagePattern('createEventTeamTask')
    async createEventTeamTask(@Body() eventTeamTask: Partial<EventTeamTask>): Promise<EventTeamTask> {
       return this.EventTeamTaskService.createEventTeamTask(eventTeamTask)
    }

    @MessagePattern('updateEventTeamTask')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateEventTeamTask( @Body() eventTeamTask: Partial<EventTeamTask>): Promise<EventTeamTask> {
        return this.EventTeamTaskService.updateEventTeamTask(eventTeamTask)
    }
    @MessagePattern('deleteEventTeamTasks')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async deleteEventTeamTasks(@Payload() id:any): Promise<boolean> {
       return this.EventTeamTaskService.deleteEventTeamTask(id);
    }
}