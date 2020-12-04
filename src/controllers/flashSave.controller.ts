import { Controller, Param, Body} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlashSave } from 'src/models/flashSave.entity';
import { FlashSaveService } from 'src/services';
@Controller('FlashSave')
export class FlashSaveController {
    constructor(
        private readonly flashSaveService:FlashSaveService
    ) { }

    @MessagePattern('getFlashSaves')
    async getFlashSaves(): Promise<FlashSave[]> {
        return await this.flashSaveService.getFlashSaves();
    }

    @MessagePattern('getFlashSaveById')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getFlashSaveById(@Param('id') id): Promise<FlashSave> {
        return await this.flashSaveService.getFlashSaveById(id)
    }

    @MessagePattern('createFlashSave')
    async createFlashSave(@Body() flashSave: Partial<FlashSave>): Promise<FlashSave> {
       return this.flashSaveService.createFlashSave(flashSave)
    }

    @MessagePattern('updateFlashSave')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateServiceContributor(@Param('id') id, @Body() flashSave: Partial<FlashSave>): Promise<FlashSave> {
        return this.flashSaveService.updateFlashSave(id,flashSave)
    }
    @MessagePattern('deleteFlashSave')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async deleteServiceContributors(@Payload() id:any): Promise<boolean> {
       return this.flashSaveService.deleteFlashSave(id);
    }
}