import { Controller, NotFoundException, Param, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EventPacks } from '../models/EventPacks.entity';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { EventPackService } from 'src/services/eventPack.service';

@Controller('eventPacks')
export class EventPacksController {
  constructor(
    @InjectRepository(EventPacks)
    private readonly EventPacksService:EventPackService,
  ) {}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @MessagePattern('getEventPacks') 
  async getEventPackss(): Promise<EventPacks[]> {
    return await this.EventPacksService.getEventPacks();
  }

  
  
  @MessagePattern('getEventPackById')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getEventPacksById(@Payload() data: string, @Ctx() context: RmqContext):Promise<EventPacks>{

    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
    return  await this.EventPacksService.getEventPackById(data)
  }
  @MessagePattern('getEventPackByevent')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getEventPackByevent(@Payload() data: string, @Ctx() context: RmqContext):Promise<EventPacks[]>{

    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
   return await this.EventPacksService.getEventPackByevent(data)
  }

  @MessagePattern('createEventPacks')
  async createEventPacks(@Payload() input: Partial<EventPacks>, @Ctx() context: RmqContext): Promise<EventPacks> {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
   return this.EventPacksService.createEventPack(input);
  }

  
  
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @MessagePattern('updateEventPacks')
  async updateEventPacks(@Payload() eventPacks: Partial<EventPacks>): Promise<EventPacks> {
    return await this.EventPacksService.updateEventPack(eventPacks);
}


  @MessagePattern('deleteEventPacks')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async deleteEventPacks(@Param('id') id): Promise<boolean> {
  
    return this.EventPacksService.deleteEventPack(id);
}
 
 
 
} 