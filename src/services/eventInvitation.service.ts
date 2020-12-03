/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Param, Logger, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EventInvitation } from '../models/EventInvitation.entity';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';



@Injectable()
export class EventInvitationService {

    constructor(@InjectRepository(EventInvitation)
        private readonly EventInvitationRepository: MongoRepository<EventInvitation>,
    ) { }
//getEventInvitations
     getEventInvitations() {
        
        const eventInvitations=  this.EventInvitationRepository.find();       
        return eventInvitations ;
    }
    //getEventInvitationById
     getEventInvitationById(@Payload() data: string) {
       
        const EventInvitation=  this.EventInvitationRepository.findOne(data);       
        return EventInvitation ;
    }
   
    getEventInvitationbyEvent(@Payload() data: string) {
       
        const EventInvitation=  this.EventInvitationRepository.findOne(data);       
        return EventInvitation ;
    }
   
    async createEventInvitation(@Payload() eventInvitation: Partial<EventInvitation>):Promise<EventInvitation> {
       
        if (!eventInvitation || !eventInvitation.event || !eventInvitation.userId) {
            console.log(`data is missing can't create EventInvitation`);
        }
        return await this.EventInvitationRepository.save(new EventInvitation(eventInvitation));
    }

    @MessagePattern('updateEventInvitation')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateEventInvitation(@Param('id') id, @Body() eventInvitation: Partial<EventInvitation>): Promise<EventInvitation> {
        console.log(eventInvitation);
    const _id  = eventInvitation._id;
    delete eventInvitation._id;
    eventInvitation.updatedAt=new Date(Date.now())
    const updated =  await this.EventInvitationRepository.findOneAndUpdate(
      {_id :ObjectID(_id)},
      {$set: eventInvitation},
      {returnOriginal: false});

    return new EventInvitation(updated.value);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @MessagePattern('deleteEventInvitation')
    async deleteEventInvitation(@Payload() id:any): Promise<boolean> {
         // Check if entity exists
         const idEventInvitation = ObjectID(id);
         //console.log(idCategory);
         const eventInvitation = await this.EventInvitationRepository.findOne(idEventInvitation);
         //console.log(category);
         const _id = eventInvitation._id;
         if (!eventInvitation) {
           return false;
         } else {
           delete eventInvitation._id;
           await this.EventInvitationRepository.findOneAndUpdate(
             { _id: ObjectID(_id) },
             { $set: { deletedAt: new Date(Date.now()) } },
             { returnOriginal: false },
           );
           return true;
         }
}
   
}