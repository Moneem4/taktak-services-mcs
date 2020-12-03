/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Param, Logger, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EventAccess } from '../models/EventAccess.entity';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';



@Injectable()
export class EventAccessService {

    constructor(@InjectRepository(EventAccess)
        private readonly EventAccessRepository: MongoRepository<EventAccess>,
    ) { }
//getEventAccesss
     getEventAccesss() {
        
        const EventAccesss=  this.EventAccessRepository.find();       
        return EventAccesss ;
    }
    //getEventAccessById
     getEventAccessById(@Payload() data: string) {
       
        const EventAccess=  this.EventAccessRepository.findOne(data);       
        return EventAccess ;
    }
   
     getEventAccessbyCreator(@Payload() data: string) {
      
        const EventAccesss=  this.EventAccessRepository.find({ where: { "creatorId": data } });       
        return EventAccesss ;
    }
   
    async createEventAccess(@Payload() eventAccess: Partial<EventAccess>):Promise<EventAccess> {
       
        if (!eventAccess || !eventAccess.event || !eventAccess.accessType) {
            console.log(`data is missing can't create EventAccess`);
        }
        return await this.EventAccessRepository.save(new EventAccess(eventAccess));
    }

    @MessagePattern('updateEventAccess')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateEventAccess(@Param('id') id, @Body() eventAccess: Partial<EventAccess>): Promise<EventAccess> {
        console.log(eventAccess);
    const _id  = eventAccess._id;
    delete eventAccess._id;
    eventAccess.updatedAt=new Date(Date.now())
    const updated =  await this.EventAccessRepository.findOneAndUpdate(
      {_id :ObjectID(_id)},
      {$set: eventAccess},
      {returnOriginal: false});

    return new EventAccess(updated.value);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @MessagePattern('deleteEventAccess')
    async deleteEventAccess(@Payload() id:any): Promise<boolean> {
        // Check if entity exists
        const idEventAccess = ObjectID(id);
        //console.log(idCategory);
        const eventAccess = await this.EventAccessRepository.findOne(idEventAccess);
        //console.log(category);
        const _id = eventAccess._id;
        if (!eventAccess) {
          return false;
        } else {
          delete eventAccess._id;
          await this.EventAccessRepository.findOneAndUpdate(
            { _id: ObjectID(_id) },
            { $set: { deletedAt: new Date(Date.now()) } },
            { returnOriginal: false },
          );
          return true;
        }
}
       
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @MessagePattern('deleteCreatorEventAccesss')
    async deleteCreatorEventAccesss(@Param('id') id): Promise<boolean> {
        // Check if entity exists
        const idEventAccess = ObjectID(id);
        const eventAccess = await this.EventAccessRepository.findOne(idEventAccess);
        //console.log(category);
        const _id = eventAccess._id;
        if (!eventAccess) {
          return false;
        } else {
          delete eventAccess._id;
          await this.EventAccessRepository.findOneAndUpdate(
            { _id: ObjectID(_id) },
            { $set: { deletedAt: new Date(Date.now()) } },
            { returnOriginal: false },
          );
          return true;
        }
    }
}