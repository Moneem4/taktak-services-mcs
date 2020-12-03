/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {  Param, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Event } from '../models/event.entity';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';



@Injectable()
export class EventService {

    constructor(@InjectRepository(Event)
        private readonly EventRepository: MongoRepository<Event>,
    ) { }
//getEvents
     getEvents() {
        
        const events=  this.EventRepository.find();       
        return events ;
    }
    //getEventById
     getEventById(@Payload() data: string) {
       
        const event=  this.EventRepository.findOne(data);       
        return event ;
    }
   
     getEventbyCreator(@Payload() data: string) {
      
        const events=  this.EventRepository.find({ where: { "creatorId": data } });       
        return events ;
    }
   
    async createEvent(@Payload() event: Partial<Event>):Promise<Event> {
       
        if (!event || !event.location || !event.description || !event.capacity|| !event.plan|| !event.filter|| !event.passtype|| !event.validation|| !event.maxPurchase|| !event.creatorId) {
            console.log(`data is missing can't create event`);
        }
        return await this.EventRepository.save(new Event(event));
    }

    @MessagePattern('updateEvent')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateEvent(@Param('id') id, @Body() event: Partial<Event>): Promise<Event> {
        console.log(event);
    const _id  = event._id;
    delete event._id;
    event.updatedAt=new Date(Date.now());
    const updated =  await this.EventRepository.findOneAndUpdate(
      {_id :ObjectID(_id)},
      {$set: event},
      {returnOriginal: false});

    return new Event(updated.value);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @MessagePattern('deleteEvent')
    async deleteEvent(@Payload() id:any): Promise<boolean> {
         // Check if entity exists
         const idEvent = ObjectID(id);
         //console.log(idCategory);
         const event = await this.EventRepository.findOne(idEvent);
         //console.log(category);
         const _id = event._id;
         if (!event) {
           return false;
         } else {
           delete event._id;
           await this.EventRepository.findOneAndUpdate(
             { _id: ObjectID(_id) },
             { $set: { deletedAt: new Date(Date.now()) } },
             { returnOriginal: false },
           );
           return true;
         }
}
       
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @MessagePattern('deleteCreatorEvents')
    async deleteCreatorEvents(@Param('id') id): Promise<boolean> {
    
        // Check if entity exists
        const exists = await this.EventRepository.findOne(id);
        if (!exists) {
           // throw new NotFoundException();
           return false ;
        
        }
          await this.EventRepository.delete(id);
        return true
    }
}