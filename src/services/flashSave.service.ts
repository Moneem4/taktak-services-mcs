/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {  Param, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import {  Payload} from '@nestjs/microServices';
import {FlashSave} from 'src/models/flashSave.entity';



@Injectable()
export class FlashSaveService {

    constructor( 
        @InjectRepository(FlashSave)
        private readonly flashSaveRepository: MongoRepository<FlashSave>,
    ) { }

     getFlashSaves() {
        
        const flashSaves=  this.flashSaveRepository.find();       
        return flashSaves ;
    }
    
     getFlashSaveById(@Payload() data: string) {
       
        const FlashSave=  this.flashSaveRepository.findOne(data);       
        return FlashSave ;
    }
   
   
    async createFlashSave(@Payload() flashSave: Partial<FlashSave>):Promise<FlashSave> {
       
        if (!flashSave || !flashSave.restaurantId || !flashSave.price) {
            console.log(`data is missing can't create flashSave`);
        }
        return await this.flashSaveRepository.save(new FlashSave(flashSave));
    }

    
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateFlashSave(@Param('id') id, @Body() flashSave: Partial<FlashSave>): Promise<FlashSave> {
        console.log(FlashSave);
     flashSave._id=id;
    delete flashSave._id;
    flashSave.updatedAt=new Date(Date.now());
    const updated =  await this.flashSaveRepository.findOneAndUpdate(
      {_id :ObjectID(id)},
      {$set: flashSave},
      {returnOriginal: false});

    return new FlashSave(updated.value);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    
    async deleteFlashSave(@Payload() id:any): Promise<boolean> {
         
         const idFlashSave = ObjectID(id);
         const FlashSave = await this.flashSaveRepository.findOne(idFlashSave);
         const _id = FlashSave._id;
         if (!FlashSave) {
           return false;
         } else {
           delete FlashSave._id;
           await this.flashSaveRepository.findOneAndUpdate(
             { _id: ObjectID(_id) },
             { $set: { deletedAt: new Date(Date.now()) } },
             { returnOriginal: false },
           );
           return true;
         }
}
  
}