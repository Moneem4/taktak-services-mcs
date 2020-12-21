import {ServiceType,Access } from 'src/schema/types.schema';
import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({
	name: 'Service',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class Service {

	@ObjectIdColumn()
	_id: ObjectID;
	@ObjectIdColumn()
	userId: ObjectID
	@Column()
	location: string
	@Column()
	description: string
	@Column()
	filter: string
	@Column()
	serviceType: ServiceType
	@Column()
	validation: boolean
	@Column()
	serviceAccess: Access
	@Column()
     updatedAt: Date=null;
	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	 createdAt: Date;
	 @DeleteDateColumn()
  deletedAt: Date=null;
	constructor(service: Partial<Service>) {
		Object.assign(this, service);
	  }
}
