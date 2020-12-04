import { Controller, Param, Body} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlashSave } from 'src/models/FlashSave.entity';
import { FlashSaveService } from 'src/services';
@Controller('FlashSave')
export class FlashSaveController {
    constructor(
        @InjectRepository(FlashSave)
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
    async createFlashSave(@Body() FlashSave: Partial<FlashSave>): Promise<FlashSave> {
       return this.flashSaveService.createFlashSave(FlashSave)
    }

    @MessagePattern('updateFlashSave')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateServiceContributor(@Param('id') id, @Body() FlashSave: Partial<FlashSave>): Promise<FlashSave> {
        return this.flashSaveService.updateFlashSave(id,FlashSave)
    }
    @MessagePattern('deleteFlashSave')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async deleteServiceContributors(@Payload() id:any): Promise<boolean> {
       return this.flashSaveService.deleteFlashSave(id);
    }
}