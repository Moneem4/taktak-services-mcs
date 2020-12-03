import { Controller, NotFoundException, Get, Param, Post, Body, BadRequestException, Put, Delete, HttpCode } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EventTeam } from '../models/eventTeam.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('eventTeam')
export class EventTeamController {
    constructor(
        @InjectRepository(EventTeam)
        private readonly EventTeamsRepository: MongoRepository<EventTeam>,
    ) { }

    @MessagePattern('getEventTeams')
    async getEventTeams(): Promise<EventTeam[]> {
        return await this.EventTeamsRepository.find();
    }

    @MessagePattern('getEventTeamById')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getEventTeamById(@Param('id') id): Promise<EventTeam> {
        const eventTeam =  await this.EventTeamsRepository.findOne(id);
        if (!eventTeam) {
            // Entity not found
            throw new NotFoundException();
        }
        return eventTeam;
    }
    @MessagePattern('eventTeamsByEvent')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async eventTeamsByEvent(@Param('id') id): Promise<EventTeam[]> {
        const eventTeam =  await this.EventTeamsRepository.find({ where: { "eventId": id } });
        if (!eventTeam) {
            // Entity not found
            throw new NotFoundException();
        }
        return eventTeam;
    }

    @MessagePattern('createEventTeam')
    async createEventTeam(@Body() eventTeam: Partial<EventTeam>): Promise<EventTeam> {
        if (!eventTeam || !eventTeam.role || !eventTeam.description|| !eventTeam.event) {
            throw new BadRequestException(`data is missing can't create EventTeam`);
        }
        return await this.EventTeamsRepository.save(new EventTeam(eventTeam));
    }

    @MessagePattern('updateEventTeam')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateEventTeam(@Payload() eventTeam: Partial<EventTeam>): Promise<EventTeam> {
        console.log(eventTeam);
        const _id  = eventTeam._id;
        delete eventTeam._id;
        const updated =  await this.EventTeamsRepository.findOneAndUpdate(
          {_id :ObjectID(_id)},
          {$set: eventTeam},
          {returnOriginal: false});
        
        return new EventTeam(updated.value);
    }
    @MessagePattern('deleteEventTeam')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async deleteEventTeam(@Param('id') id): Promise<boolean> {
        const ideventPack=ObjectID(id);
        const eventTeam = await this.EventTeamsRepository.findOne(ideventPack);
    console.log(eventTeam);
    if (!eventTeam) 
     { return false }
    else {
    const eventTeamDeleted= await this.EventTeamsRepository.delete(ideventPack);
    if(!eventTeamDeleted){return false }
    else { return true;}
    }
    }
}