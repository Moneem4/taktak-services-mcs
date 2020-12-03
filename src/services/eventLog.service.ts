/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Param, Logger, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EventLog } from '../models/EventLog.entity';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';



@Injectable()
export class EventLogService {

    constructor(@InjectRepository(EventLog)
        private readonly EventLogRepository: MongoRepository<EventLog>,
    ) { }
//getEventLogs
     getEventLogs() {
        
        const EventLogs=  this.EventLogRepository.find();       
        return EventLogs ;
    }
    //getEventLogById
     getEventLogById(@Payload() data: string) {
       
        const EventLog=  this.EventLogRepository.findOne(data);       
        return EventLog ;
    }
   
    getEventLogByUserId(@Payload() data: string) {
      
        const EventLogs=  this.EventLogRepository.find({ where: { "userId": data } });       
        return EventLogs ;
    }
   //createEventLog
    async createEventLog(@Payload() eventLog: Partial<EventLog>):Promise<EventLog> {
       
        if (!eventLog || !eventLog.userId || !eventLog.event ) {
            console.log(`data is missing can't create EventLog`);
        }
        return await this.EventLogRepository.save(new EventLog(eventLog));
    }

   
    async updateEventLog(@Param('id') id, @Body() eventLog: Partial<EventLog>): Promise<EventLog> {
        console.log(eventLog);
    const _id  = eventLog._id;
    delete eventLog._id;
    eventLog.updatedAt=new Date(Date.now())
    const updated =  await this.EventLogRepository.findOneAndUpdate(
      {_id :ObjectID(_id)},
      {$set: eventLog},
      {returnOriginal: false});

    return new EventLog(updated.value);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    
    async deleteEventLog(@Payload() id:any): Promise<boolean> {
        
         // Check if entity exists
         const idEventLog = ObjectID(id);
         //console.log(idCategory);
         const eventLog = await this.EventLogRepository.findOne(idEventLog);
         //console.log(category);
         const _id = eventLog._id;
         if (!eventLog) {
           return false;
         } else {
           delete eventLog._id;
           await this.EventLogRepository.findOneAndUpdate(
             { _id: ObjectID(_id) },
             { $set: { deletedAt: new Date(Date.now()) } },
             { returnOriginal: false },
           );
           return true;
         }
}
}