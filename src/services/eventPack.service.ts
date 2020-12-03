/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Param, Logger, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EventPacks } from '../models/eventPacks.entity';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';



@Injectable()
export class EventPackService {

    constructor(@InjectRepository(EventPacks)
        private readonly EventPackRepository: MongoRepository<EventPacks>,
    ) { }
//getEventPacks
     getEventPacks() {
        const EventPacks=  this.EventPackRepository.find();       
        return EventPacks ;
    }
    //getEventPackById
     getEventPackById(@Payload() data: string) {
       
        const eventPack=  this.EventPackRepository.findOne(data);       
        return eventPack ;
    }
   
    getEventPackByevent(@Payload() data: string) {
      
        const EventPacks=  this.EventPackRepository.find({ where: { "event": data } });       
        return EventPacks ;
    }
   //createEventPack
    async createEventPack(@Payload() eventPack: Partial<EventPacks>):Promise<EventPacks> {
       
        if (!eventPack || !eventPack.price || !eventPack.event||eventPack.capacity||eventPack.description ) {
            console.log(`data is missing can't create EventPack`);
        }
        return await this.EventPackRepository.save(new EventPacks(eventPack));
    }

   
    async updateEventPack( @Body() eventPack: Partial<EventPacks>): Promise<EventPacks> {
        console.log(eventPack);
    const _id  = eventPack._id;
    delete eventPack._id;
    eventPack.updatedAt=new Date(Date.now())
    const updated =  await this.EventPackRepository.findOneAndUpdate(
      {_id :ObjectID(_id)},
      {$set: eventPack},
      {returnOriginal: false});

    return new EventPacks(updated.value);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    
    async deleteEventPack(@Payload() id:any): Promise<boolean> {

         // Check if entity exists
         const idEventPack = ObjectID(id);
         //console.log(idCategory);
         const eventPack = await this.EventPackRepository.findOne(idEventPack);
         //console.log(category);
         const _id = eventPack._id;
         if (!eventPack) {
           return false;
         } else {
           delete eventPack._id;
           await this.EventPackRepository.findOneAndUpdate(
             { _id: ObjectID(_id) },
             { $set: { deletedAt: new Date(Date.now()) } },
             { returnOriginal: false },
           );
           return true;
         }
}
}