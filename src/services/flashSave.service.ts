/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {  Param, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { FlashSave } from '../models/FlashSave.entity';
import {  Payload} from '@nestjs/microServices';



@Injectable()
export class FlashSaveService {

    constructor(@InjectRepository(FlashSave)
        private readonly FlashSaveRepository: MongoRepository<FlashSave>,
    ) { }

     getFlashSaves() {
        
        const FlashSaves=  this.FlashSaveRepository.find();       
        return FlashSaves ;
    }
    
     getFlashSaveById(@Payload() data: string) {
       
        const FlashSave=  this.FlashSaveRepository.findOne(data);       
        return FlashSave ;
    }
   
   
    async createFlashSave(@Payload() itWithStranger: Partial<FlashSave>):Promise<FlashSave> {
       
        if (!itWithStranger || !itWithStranger.location || !itWithStranger.description) {
            console.log(`data is missing can't create itWithStranger`);
        }
        return await this.FlashSaveRepository.save(new FlashSave(itWithStranger));
    }

    
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateFlashSave(@Param('id') id, @Body() flashSave: Partial<FlashSave>): Promise<FlashSave> {
        console.log(FlashSave);
     flashSave._id=id;
    delete flashSave._id;
    flashSave.updatedAt=new Date(Date.now());
    const updated =  await this.FlashSaveRepository.findOneAndUpdate(
      {_id :ObjectID(id)},
      {$set: flashSave},
      {returnOriginal: false});

    return new FlashSave(updated.value);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    
    async deleteFlashSave(@Payload() id:any): Promise<boolean> {
         
         const idFlashSave = ObjectID(id);
         const FlashSave = await this.FlashSaveRepository.findOne(idFlashSave);
         const _id = FlashSave._id;
         if (!FlashSave) {
           return false;
         } else {
           delete FlashSave._id;
           await this.FlashSaveRepository.findOneAndUpdate(
             { _id: ObjectID(_id) },
             { $set: { deletedAt: new Date(Date.now()) } },
             { returnOriginal: false },
           );
           return true;
         }
}
  
}