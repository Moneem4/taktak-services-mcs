import { Controller, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ObjectID } from 'mongodb';
import { EventPackUser } from '../models/eventPackUser.entity';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { EventPackUserervice } from 'src/services/eventPackUser.service';

@Controller('eventPackUser')
export class EventPackUserController {
  constructor(
    @InjectRepository(EventPackUser)
    private readonly eventPackUserService:EventPackUserervice,
  ) {}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @MessagePattern('getEventPackUsers') 
  async getEventPackUsers(): Promise<EventPackUser[]> {
    return await this.eventPackUserService.getEventPackUser();
  }

  
  
  @MessagePattern('getEventPackUserById')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getEventPackUserById(@Payload() data: string, @Ctx() context: RmqContext):Promise<EventPackUser>{

    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    return this.eventPackUserService.getEventPackUserById(data);
  }

  @MessagePattern('createEventPackUser')
  async createEventPackUser(@Payload() input: Partial<EventPackUser>, @Ctx() context: RmqContext): Promise<EventPackUser> {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    return await this.eventPackUserService.createEventPackUser(input);
  }

  
  
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @MessagePattern('updateEventPackUser')
  async updateEventPackUser(@Payload() eventPackUser): Promise<EventPackUser> {
  return await  this.eventPackUserService.updateEventPackUser(eventPackUser)
}


  @MessagePattern('deleteEventPackUser')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async deleteEventPackUser(@Param('id') id): Promise<boolean> {
    return this.eventPackUserService.deleteEventPackUser(id)
  }
 
 
 
} 