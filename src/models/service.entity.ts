
import { PassType } from 'src/schema/types.schema';
import { Entity, ObjectID, ObjectIdColumn, Column, UpdateDateColumn, OneToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm';

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
	creatorId: ObjectID
	@Column()
	location: string
	@Column()
	description: string

	@Column()
	capacity: number
	@Column()
	plan: string
	@Column()
	filter: string
	@Column()
	passtype: PassType
	@Column()
	validation: boolean
	@Column()
	maxPurchase: number
	
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
