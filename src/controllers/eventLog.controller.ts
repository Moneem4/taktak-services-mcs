/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Param, Logger, Body } from '@nestjs/common';
import { EventLog } from '../models/eventLog.entity';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { EventLogService } from 'src/services/Eventlog.service';



@Controller('Eventlog')
export class EventlogController {

    private logger = new Logger('Eventlog  Controller')
    constructor(private readonly eventlogService:EventLogService
        
    ) { }

    @MessagePattern('getEventlogs')
    async getEventlogs(@Payload() data: string, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        channel.ack(orginalMessage);
       return await this.eventlogService.getEventLogs();
    }
    @MessagePattern('getEventlogById')
    async getEventlogById(@Payload() data: string, @Ctx() context: RmqContext) {
       console.log('fffffffffffff');
      const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        channel.ack(orginalMessage);
        return await this.eventlogService.getEventLogById(data);
    }
    @MessagePattern('getEventLogByUserId')
    async getEventLogByUserId(@Payload() data: string, @Ctx() context: RmqContext) {
       console.log('fffffffffffff');
      const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        channel.ack(orginalMessage);
        return this.eventlogService.getEventLogByUserId(data);
    }
    @MessagePattern('createEventlog')
    async createEventlog(@Payload() eventlog: Partial<EventLog>, @Ctx() context: RmqContext):Promise<EventLog> {
        const channel = context.getChannelRef();
        const orginalMessage = context.getMessage();
        return await this.eventlogService.createEventLog(eventlog);
    }

    @MessagePattern('updateEventlog')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateEventlog(@Param('id') id, @Body() eventlog: Partial<EventLog>): Promise<EventLog> {
     return this.eventlogService.updateEventLog(id,eventlog);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @MessagePattern('deleteEventlog')
    async deleteEventlog(@Payload() id:any): Promise<boolean> {
        // Check if entity exists
      return this.eventlogService.deleteEventLog(id);
    }

       
    
   
    
       
}