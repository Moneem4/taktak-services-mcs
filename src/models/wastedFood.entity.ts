import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Service } from './service.entity';
@Entity({
    name: 'WastedFood',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class WastedFood  {
    @ObjectIdColumn()
    _id: ObjectID
    @ObjectIdColumn()
    restaurantId: ObjectID
    @ObjectIdColumn()
    userId: ObjectID
    @Column()
    description: string
    @Column()
    title:string
    @Column()
	filter: string
    @Column()
     updatedAt: Date=null;
	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	 createdAt: Date;
	 @DeleteDateColumn()
  deletedAt: Date=null;
    @Column()
    foods :ObjectID[]
    @Column()
    utility:string

    constructor(wastedFood: Partial<WastedFood>) {
        Object.assign(this, wastedFood);

	  }
}
