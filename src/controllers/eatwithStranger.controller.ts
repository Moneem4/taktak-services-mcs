import { Controller, Param, Body} from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { EatWithStranger } from 'src/models/eatWithStranger.entity';
import { EatWithStrangerService } from 'src/services/eatWithStranger.service';
@Controller('EatWithStranger')
export class EatWithStrangerController {
    constructor(
        private readonly eatWithStrangerService:EatWithStrangerService
    ) { }

    @MessagePattern('getEatWithStrangers')
    async getEatWithStrangers(): Promise<EatWithStranger[]> {
        return await this.eatWithStrangerService.getEatWithStrangers();
    }

    @MessagePattern('getEatWithStrangerById')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getEatWithStrangerById(@Param('id') id): Promise<EatWithStranger> {
        return await this.eatWithStrangerService.getEatWithStrangerById(id)
    }

    @MessagePattern('createEatWithStranger')
    async createEatWithStranger(@Body() eatWithStranger: Partial<EatWithStranger>): Promise<EatWithStranger> {
       return this.eatWithStrangerService.createEatWithStranger(eatWithStranger)
    }

    @MessagePattern('updateEatWithStranger')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateServiceContributor(@Param('id') id, @Body() eatWithStranger: Partial<EatWithStranger>): Promise<EatWithStranger> {
        return this.eatWithStrangerService.updateEatWithStranger(id,eatWithStranger)
    }
    @MessagePattern('deleteEatWithStranger')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async deleteServiceContributors(@Payload() id:any): Promise<boolean> {
       return this.eatWithStrangerService.deleteEatWithStranger(id);
    }
}