import { Controller, Param, Body} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WastedFood } from 'src/models/wastedFood.entity';
import { WastedFoodService } from 'src/services/wastedFood.service';
@Controller('WastedFood')
export class WastedFoodController {
    constructor(
       
        private readonly wastedFoodService:WastedFoodService
    ) { }

    @MessagePattern('getWastedFoods')
    async getWastedFoods(): Promise<WastedFood[]> {
        return await this.wastedFoodService.getWastedFoods();
    }

    @MessagePattern('getWastedFoodById')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getWastedFoodById(@Param('id') id): Promise<WastedFood> {
        return await this.wastedFoodService.getWastedFoodById(id)
    }

    @MessagePattern('createWastedFood')
    async createWastedFood(@Body() wastedFood: Partial<WastedFood>): Promise<WastedFood> {
       return this.wastedFoodService.createWastedFood(wastedFood)
    }

    @MessagePattern('updateWastedFood')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateServiceContributor(@Param('id') id, @Body() wastedFood: Partial<WastedFood>): Promise<WastedFood> {
        return this.wastedFoodService.updateWastedFood(id,wastedFood)
    }
    @MessagePattern('deleteWastedFood')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async deleteServiceContributors(@Payload() id:any): Promise<boolean> {
       return this.wastedFoodService.deleteWastedFood(id);
    }
}