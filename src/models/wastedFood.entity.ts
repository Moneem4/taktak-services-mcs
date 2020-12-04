import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Service } from './service.entity';
@Entity({
    name: 'WastedFood',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class WastedFood extends Service {
    @ObjectIdColumn()
    _id: ObjectID
    @Column()
     updatedAt: Date=null;
	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	 createdAt: Date;
	 @DeleteDateColumn()
  deletedAt: Date=null;
    @Column()
    foods :ObjectID[]
    constructor(wastedFood: Partial<Service>) {
        super(name);
        Object.assign(this, wastedFood);

	  }
}
