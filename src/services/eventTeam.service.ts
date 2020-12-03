/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Param, Logger, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EventTeam } from '../models/EventTeam.entity';
import {  Payload } from '@nestjs/microservices';



@Injectable()
export class EventTeamervice {

    constructor(@InjectRepository(EventTeam)
        private readonly EventTeamRepository: MongoRepository<EventTeam>,
    ) { }
//getEventTeam
     getEventTeam() {
        const EventTeam=  this.EventTeamRepository.find();       
        return EventTeam ;
    }
    //getEventPackById
     getEventTeamById(@Payload() data: string) {
       
        const eventPack=  this.EventTeamRepository.findOne(data);       
        return eventPack ;
    }
   
    getEventTeamByevent(@Payload() data: string) {
      
        const EventTeam=  this.EventTeamRepository.find({ where: { "event": data } });       
        return EventTeam ;
    }
   //createEventPack
    async createEventTeam(@Payload() eventTeam:Partial<EventTeam>):Promise<EventTeam> {
       
        if (!eventTeam || !eventTeam.role || !eventTeam.description||eventTeam.event ) {
            console.log(`data is missing can't create EventPack`);
        }
        return await this.EventTeamRepository.save(new EventTeam(eventTeam));
    }

   
    async updateEventTeam( @Body() eventTeam: Partial<EventTeam>): Promise<EventTeam> {
        console.log(eventTeam);
    const _id  = eventTeam._id;
    delete eventTeam._id;
    eventTeam.updatedAt=new Date(Date.now())
    const updated =  await this.EventTeamRepository.findOneAndUpdate(
      {_id :ObjectID(_id)},
      {$set: eventTeam},
      {returnOriginal: false});

    return new EventTeam(updated.value);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    
    async deleteEventTeam(@Payload() id:any): Promise<boolean> {
        const idEventTeam = ObjectID(id);
    //console.log(idCategory);
    const eventTeam = await this.EventTeamRepository.findOne(idEventTeam);
    //console.log(category);
    const _id = eventTeam._id;
    if (!eventTeam) {
      return false;
    } else {
      delete eventTeam._id;
      await this.EventTeamRepository.findOneAndUpdate(
        { _id: ObjectID(_id) },
        { $set: { deletedAt: new Date(Date.now()) } },
        { returnOriginal: false },
      );
      return true;
    }
  }
}