/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Param, Logger, Body } from '@nestjs/common';
import { EventInvitation } from '../models/EventInvitation.entity';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { EventInvitationService } from 'src/services/EventInvitation.service';



@Controller('EventInvitation')
export class EventInvitationController {

    private logger = new Logger('EventInvitation  Controller')
    constructor(private readonly eventInvitationService:EventInvitationService
        
    ) { }

    @MessagePattern('getEventInvitations')
    async getEventInvitations(@Payload() data: string, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        channel.ack(orginalMessage);
       return await this.eventInvitationService.getEventInvitations();
    }
    @MessagePattern('getEventInvitationById')
    async getEventInvitationById(@Payload() data: string, @Ctx() context: RmqContext) {
       console.log('fffffffffffff');
      const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        channel.ack(orginalMessage);
        return await this.eventInvitationService.getEventInvitationById(data);
    }
    @MessagePattern('getEventInvitationbyEvent')
    async getEventInvitationbyEvent(@Payload() data: string, @Ctx() context: RmqContext) {
       console.log('fffffffffffff');
      const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        channel.ack(orginalMessage);
        return this.eventInvitationService.getEventInvitationbyEvent(data);
    }
    @MessagePattern('createEventInvitation')
    async createEventInvitation(@Payload() EventInvitation: Partial<EventInvitation>, @Ctx() context: RmqContext):Promise<EventInvitation> {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        return await this.eventInvitationService.createEventInvitation(EventInvitation);
    }

    @MessagePattern('updateEventInvitation')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateEventInvitation(@Param('id') id, @Body() EventInvitation: Partial<EventInvitation>): Promise<EventInvitation> {
     return this.eventInvitationService.updateEventInvitation(id,EventInvitation);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @MessagePattern('deleteEventInvitation')
    async deleteEventInvitation(@Payload() id:any): Promise<boolean> {
        // Check if entity exists
      return this.eventInvitationService.deleteEventInvitation(id);
    }

       
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    
    
       
}