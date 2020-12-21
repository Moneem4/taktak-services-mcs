/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {  Param, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Service } from '../models/service.entity';
import { MessagePattern, Payload} from '@nestjs/microservices';



@Injectable()
export class ServiceService {

    constructor(@InjectRepository(Service)
        private readonly serviceRepository: MongoRepository<Service>,
    ) { }
//getServices
     getServices() {
        
        const services=  this.serviceRepository.find();       
        return services ;
    }
    //getServiceById
     getServiceById(@Payload() data: string) {
       
        const Service=  this.serviceRepository.findOne(data);       
        return Service ;
    }
   
     getServiceByCreator(@Payload() data: string) {
      
        const Services=  this.serviceRepository.find({ where: { "userId": data } });       
        return Services ;
    }
   
    async createService(@Payload() service: Partial<Service>):Promise<Service> {
       
        if (!service || !service.location || !service.description || !service.filter|| !service.serviceType|| !service.validation|| !service.userId) {
            console.log(`data is missing can't create service`);
        }
        return await this.serviceRepository.save(new Service(service));
    }

    @MessagePattern('updateService')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateService(@Param('id') id, @Body() service: Partial<Service>): Promise<Service> {
        console.log(service);
    const _id  = service._id;
    delete service._id;
    service.updatedAt=new Date(Date.now());
    const updated =  await this.serviceRepository.findOneAndUpdate(
      {_id :ObjectID(_id)},
      {$set: service},
      {returnOriginal: false});

    return new Service(updated.value);
  }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @MessagePattern('deleteService')
    async deleteService(@Payload() id:any): Promise<boolean> {
         
         const idService = ObjectID(id);
         const Service = await this.serviceRepository.findOne(idService);
         const _id = Service._id;
         if (!Service) {
           return false;
         } else {
           delete Service._id;
           await this.serviceRepository.findOneAndUpdate(
             { _id: ObjectID(_id) },
             { $set: { deletedAt: new Date(Date.now()) } },
             { returnOriginal: false },
           );
           return true;
         }
}
       
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @MessagePattern('deleteCreatorServices')
    async deleteCreatorServices(@Param('id') id): Promise<boolean> {
    
        // Check if entity exists
        const exists = await this.serviceRepository.findOne(id);
        if (!exists) {
           // throw new NotFoundException();
           return false ;
        
        }
          await this.serviceRepository.delete(id);
        return true
    }
}