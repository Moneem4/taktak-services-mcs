/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Param, Logger, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EventPackUser } from '../models/EventPackUser.entity';
import {  Payload } from '@nestjs/microservices';



@Injectable()
export class EventPackUserervice {

    constructor(@InjectRepository(EventPackUser)
        private readonly EventPackRepository: MongoRepository<EventPackUser>,
    ) { }
//getEventPackUser
     getEventPackUser() {
        const eventPackUser=  this.EventPackRepository.find();       
        return eventPackUser ;
    }
    //getEventPackById
     getEventPackUserById(@Payload() data: string) {
       
        const eventPack=  this.EventPackRepository.findOne(data);       
        return eventPack ;
    }
   
    getEventPackUserByevent(@Payload() data: string) {
      
        const EventPackUser=  this.EventPackRepository.find({ where: { "event": data } });       
        return EventPackUser ;
    }
   //createEventPack
    async createEventPackUser(@Payload() eventPackUser:Partial<EventPackUser>):Promise<EventPackUser> {
       
        if (!eventPackUser || !eventPackUser.content || !eventPackUser.userId||eventPackUser.quantity||eventPackUser.eventPacks||eventPackUser.eventPackUserType ) {
            console.log(`data is missing can't create EventPack`);
        }
        return await this.EventPackRepository.save(new EventPackUser(eventPackUser));
    }

   
    async updateEventPackUser( @Body() eventPackUser: Partial<EventPackUser>): Promise<EventPackUser> {
        console.log(eventPackUser);
    const _id  = eventPackUser._id;
    delete eventPackUser._id;
    eventPackUser.updatedAt=new Date(Date.now());
    const updated =  await this.EventPackRepository.findOneAndUpdate(
      {_id :ObjectID(_id)},
      {$set: eventPackUser},
      {returnOriginal: false});

    return new EventPackUser(updated.value);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    
    async deleteEventPackUser(@Payload() id:any): Promise<boolean> {
        // Check if entity exists
        const idEventPackUser = ObjectID(id);
        //console.log(idCategory);
        const eventPackUser = await this.EventPackRepository.findOne(idEventPackUser);
        //console.log(category);
        const _id = eventPackUser._id;
        if (!eventPackUser) {
          return false;
        } else {
          delete eventPackUser._id;
          await this.EventPackRepository.findOneAndUpdate(
            { _id: ObjectID(_id) },
            { $set: { deletedAt: new Date(Date.now()) } },
            { returnOriginal: false },
          );
          return true;
        }
}
}