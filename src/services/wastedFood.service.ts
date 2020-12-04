/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {  Param, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { WastedFood } from '../models/wastedFood.entity';
import {  Payload} from '@nestjs/microServices';



@Injectable()
export class WastedFoodService {

    constructor(@InjectRepository(WastedFood)
        private readonly WastedFoodRepository: MongoRepository<WastedFood>,
    ) { }

     getWastedFoods() {
        
        const WastedFoods=  this.WastedFoodRepository.find();       
        return WastedFoods ;
    }
    
     getWastedFoodById(@Payload() data: string) {
       
        const WastedFood=  this.WastedFoodRepository.findOne(data);       
        return WastedFood ;
    }
   
   
    async createWastedFood(@Payload() wastedFood: Partial<WastedFood>):Promise<WastedFood> {
       
        if (!wastedFood || !wastedFood.location || !wastedFood.description) {
            console.log(`data is missing can't create wastedFood`);
        }
        
        return await this.WastedFoodRepository.save(new WastedFood(wastedFood));
    }

    
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateWastedFood(@Param('id') id, @Body() wastedFood: Partial<WastedFood>): Promise<WastedFood> {
        console.log(WastedFood);
     wastedFood._id=id;
    delete wastedFood._id;
    wastedFood.updatedAt=new Date(Date.now());
    const updated =  await this.WastedFoodRepository.findOneAndUpdate(
      {_id :ObjectID(id)},
      {$set: wastedFood},
      {returnOriginal: false});

    return new WastedFood(updated.value);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    
    async deleteWastedFood(@Payload() id:any): Promise<boolean> {
         
         const idWastedFood = ObjectID(id);
         const WastedFood = await this.WastedFoodRepository.findOne(idWastedFood);
         const _id = WastedFood._id;
         if (!WastedFood) {
           return false;
         } else {
           delete WastedFood._id;
           await this.WastedFoodRepository.findOneAndUpdate(
             { _id: ObjectID(_id) },
             { $set: { deletedAt: new Date(Date.now()) } },
             { returnOriginal: false },
           );
           return true;
         }
}
  
}