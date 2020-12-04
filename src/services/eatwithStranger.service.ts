/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {  Param, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { EatWithStranger } from '../models/eatWithStranger.entity';
import {  Payload} from '@nestjs/microServices';



@Injectable()
export class EatWithStrangerService {

    constructor(@InjectRepository(EatWithStranger)
        private readonly eatWithStrangerRepository: MongoRepository<EatWithStranger>,
    ) { }
//getServiceContributors
     getEatWithStrangers() {
        
        const eatWithStrangers=  this.eatWithStrangerRepository.find();       
        return eatWithStrangers ;
    }
    //getServiceContributorById
     getEatWithStrangerById(@Payload() data: string) {
       
        const eatWithStranger=  this.eatWithStrangerRepository.findOne(data);       
        return eatWithStranger ;
    }
   
   
    async createEatWithStranger(@Payload() itWithStranger: Partial<EatWithStranger>):Promise<EatWithStranger> {
       
        if (!itWithStranger || !itWithStranger.location || !itWithStranger.description) {
            console.log(`data is missing can't create itWithStranger`);
        }
        return await this.eatWithStrangerRepository.save(new EatWithStranger(itWithStranger));
    }

    
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateEatWithStranger(@Param('id') id, @Body() eatWithStranger: Partial<EatWithStranger>): Promise<EatWithStranger> {
        console.log(eatWithStranger);
     eatWithStranger._id=id;
    delete eatWithStranger._id;
    eatWithStranger.updatedAt=new Date(Date.now());
    const updated =  await this.eatWithStrangerRepository.findOneAndUpdate(
      {_id :ObjectID(id)},
      {$set: eatWithStranger},
      {returnOriginal: false});

    return new EatWithStranger(updated.value);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    
    async deleteEatWithStranger(@Payload() id:any): Promise<boolean> {
         
         const idEatWithStranger = ObjectID(id);
         const eatWithStranger = await this.eatWithStrangerRepository.findOne(idEatWithStranger);
         const _id = eatWithStranger._id;
         if (!eatWithStranger) {
           return false;
         } else {
           delete eatWithStranger._id;
           await this.eatWithStrangerRepository.findOneAndUpdate(
             { _id: ObjectID(_id) },
             { $set: { deletedAt: new Date(Date.now()) } },
             { returnOriginal: false },
           );
           return true;
         }
}
  
}