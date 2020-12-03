/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Param, Logger, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Task } from '../models/Task.entity';
import {  Payload } from '@nestjs/microservices';



@Injectable()
export class Taskservice {

    constructor(@InjectRepository(Task)
        private readonly TaskRepository: MongoRepository<Task>,
    ) { }
//getTask
     getTasks() {
        const Task=  this.TaskRepository.find();       
        return Task ;
    }
    //getEventPackById
     getTaskById(@Payload() data: string) {
       
        const Task=  this.TaskRepository.findOne(data);       
        return Task ;
    }
   
    
   //createEventPack
    async createTask(@Payload() task:Partial<Task>):Promise<Task> {
       
        if (!task || !task.state || !task.nom|| !task.conditions|| !task.description|| !task.state|| !task.updateBy|| !task.eventTeamTask|| !task.visibility|| !task.userId|| !task.creatorId) {
            console.log(`data is missing can't create EventPack`);
        }
        return await this.TaskRepository.save(new Task(task));
    }

   
    async updateTask( @Body() task: Partial<Task>): Promise<Task> {
        console.log(task);
    const _id  = task._id;
    delete task._id;
    task.updatedAt=new Date(Date.now())
    const updated =  await this.TaskRepository.findOneAndUpdate(
      {_id :ObjectID(_id)},
      {$set: task},
      {returnOriginal: false});

    return new Task(updated.value);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    
    async deleteTask(@Payload() id:any): Promise<boolean> {
        const idTask = ObjectID(id);
    
    const task = await this.TaskRepository.findOne(idTask);
    
    const _id = task._id;
    if (!task) {
      return false;
    } else {
      delete task._id;
      await this.TaskRepository.findOneAndUpdate(
        { _id: ObjectID(_id) },
        { $set: { deletedAt: new Date(Date.now()) } },
        { returnOriginal: false },
      );
      return true;
    }
  }
  
}