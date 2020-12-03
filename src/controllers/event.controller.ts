/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Param, Logger, Body } from '@nestjs/common';
import { Event } from '../models/event.entity';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { EventService } from 'src/services/event.service';



@Controller('event')
export class EventController {

    private logger = new Logger('Event  Controller')
    constructor(private readonly eventService:EventService
        
    ) { }

    @MessagePattern('getEvents')
    async getEvents(@Payload() data: string, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        channel.ack(orginalMessage);
       return await this.eventService.getEvents();
    }
    @MessagePattern('getEventById')
    async getEventById(@Payload() data: string, @Ctx() context: RmqContext) {
       console.log('fffffffffffff');
      const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        channel.ack(orginalMessage);
        return await this.eventService.getEventById(data);
    }
    @MessagePattern('getEventbyCreator')
    async getEventbyCreator(@Payload() data: string, @Ctx() context: RmqContext) {
       console.log('fffffffffffff');
      const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        channel.ack(orginalMessage);
        return this.eventService.getEventbyCreator(data);
    }
    @MessagePattern('createEvent')
    async createEvent(@Payload() event: Partial<Event>, @Ctx() context: RmqContext):Promise<Event> {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        return await this.eventService.createEvent(event);
    }

    @MessagePattern('updateEvent')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateEvent(@Param('id') id, @Body() event: Partial<Event>): Promise<Event> {
     return this.eventService.updateEvent(id,event);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @MessagePattern('deleteEvent')
    async deleteEvent(@Payload() id:any): Promise<boolean> {
        // Check if entity exists
      return this.eventService.deleteEvent(id);
    }

       
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @MessagePattern('deleteCreatorEvents')
    async deleteUserEvents(@Param('id') id): Promise<boolean> {
   
       return this.eventService.deleteCreatorEvents(id); 
    }
    
       
}