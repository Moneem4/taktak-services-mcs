import { Controller, Param, Body} from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { Service } from 'src/models/service.entity';
import { ServiceService } from 'src/services/service.service';
@Controller('Service')
export class ServiceController {
    constructor(
        private readonly serviceService:ServiceService
    ) { }

    @MessagePattern('getServices')
    async getServices(): Promise<Service[]> {
        return await this.serviceService.getServices();
    }

    @MessagePattern('getServiceById')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getServiceById(@Param('id') id): Promise<Service> {
        return await this.serviceService.getServiceById(id)
    }

    @MessagePattern('createService')
    async createService(@Body() service: Partial<Service>): Promise<Service> {
       console.log("ffffff");
        return this.serviceService.createService(service)
    }

    @MessagePattern('updateService')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateServiceContributor(@Param('id') id, @Body() service: Partial<Service>): Promise<Service> {
        return this.serviceService.updateService(id,service)
    }
    @MessagePattern('deleteService')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async deleteServiceContributors(@Payload() id:any): Promise<boolean> {
       return this.serviceService.deleteService(id);
    }
}