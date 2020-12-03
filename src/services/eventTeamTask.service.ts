/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Param, Logger, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EventTeamTask } from '../models/EventTeamTask.entity';
import {  Payload } from '@nestjs/microservices';



@Injectable()
export class EventTeamTaskervice {

    constructor(@InjectRepository(EventTeamTask)
        private readonly EventTeamTaskRepository: MongoRepository<EventTeamTask>,
    ) { }
//getEventTeamTask
     getEventTeamTasks() {
        const EventTeamTask=  this.EventTeamTaskRepository.find();       
        return EventTeamTask ;
    }
    //getEventPackById
     getEventTeamTaskById(@Payload() data: string) {
       
        const eventTeamTask=  this.EventTeamTaskRepository.findOne(data);       
        return eventTeamTask ;
    }
   
    
   //createEventPack
    async createEventTeamTask(@Payload() eventTeamTask:Partial<EventTeamTask>):Promise<EventTeamTask> {
       
        if (!eventTeamTask || !eventTeamTask.state || !eventTeamTask.visibility) {
            console.log(`data is missing can't create EventPack`);
        }
        return await this.EventTeamTaskRepository.save(new EventTeamTask(eventTeamTask));
    }

   
    async updateEventTeamTask( @Body() eventTeamTask: Partial<EventTeamTask>): Promise<EventTeamTask> {
        console.log(eventTeamTask);
    const _id  = eventTeamTask._id;
    delete eventTeamTask._id;
    eventTeamTask.updatedAt=new Date(Date.now())
    const updated =  await this.EventTeamTaskRepository.findOneAndUpdate(
      {_id :ObjectID(_id)},
      {$set: eventTeamTask},
      {returnOriginal: false});

    return new EventTeamTask(updated.value);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    
    async deleteEventTeamTask(@Payload() id:any): Promise<boolean> {
        const idEventTeamTask = ObjectID(id);
    //console.log(idCategory);
    const eventTeamTask = await this.EventTeamTaskRepository.findOne(idEventTeamTask);
    //console.log(category);
    const _id = eventTeamTask._id;
    if (!eventTeamTask) {
      return false;
    } else {
      delete eventTeamTask._id;
      await this.EventTeamTaskRepository.findOneAndUpdate(
        { _id: ObjectID(_id) },
        { $set: { deletedAt: new Date(Date.now()) } },
        { returnOriginal: false },
      );
      return true;
    }
  }
}