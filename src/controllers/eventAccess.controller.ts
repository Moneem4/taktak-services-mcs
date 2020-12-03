/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Param, Logger, Body } from '@nestjs/common';

import { EventAccess } from '../models/EventAccess.entity';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { EventAccessService } from 'src/services/EventAccess.service';



@Controller('EventAccess')
export class EventAccessController {

    private logger = new Logger('EventAccess  Controller')
    constructor(private readonly EventAccessService:EventAccessService
        
    ) { }

    @MessagePattern('getEventAccesss')
    async getEventAccesss(@Payload() data: string, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        channel.ack(orginalMessage);
       return await this.EventAccessService.getEventAccesss();
    }
    @MessagePattern('getEventAccessById')
    async getEventAccessById(@Payload() data: string, @Ctx() context: RmqContext) {
       console.log('fffffffffffff');
      const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        channel.ack(orginalMessage);
        return await this.EventAccessService.getEventAccessById(data);
    }
    @MessagePattern('getEventAccessbyCreator')
    async getEventAccessbyCreator(@Payload() data: string, @Ctx() context: RmqContext) {
       console.log('fffffffffffff');
      const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        channel.ack(orginalMessage);
        return this.EventAccessService.getEventAccessbyCreator(data);
    }
    @MessagePattern('createEventAccess')
    async createEventAccess(@Payload() EventAccess: Partial<EventAccess>, @Ctx() context: RmqContext):Promise<EventAccess> {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        return await this.EventAccessService.createEventAccess(EventAccess);
    }

    @MessagePattern('updateEventAccess')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateEventAccess(@Param('id') id, @Body() EventAccess: Partial<EventAccess>): Promise<EventAccess> {
     return this.EventAccessService.updateEventAccess(id,EventAccess);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @MessagePattern('deleteEventAccess')
    async deleteEventAccess(@Payload() id:any): Promise<boolean> {
        // Check if entity exists
      return this.EventAccessService.deleteEventAccess(id);
    }

       
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @MessagePattern('deleteCreatorEventAccesss')
    async deleteUserEventAccesss(@Param('id') id): Promise<boolean> {
   
       return this.EventAccessService.deleteCreatorEventAccesss(id); 
    }
    
       
}