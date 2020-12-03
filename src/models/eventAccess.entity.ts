import { AccessType } from 'src/schema/types.schema';
import { Entity, ObjectID, ObjectIdColumn, Column, UpdateDateColumn, ManyToOne, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity({
    name: 'EventAccess',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class EventAccess {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    users: [ObjectID]
   
    @Column()
    accessType: AccessType

    @ManyToOne(() => Event, event => event.accesses, {
        nullable: false,
        cascade: ["remove", "update"]
      })event:Event
    @Column()
     updatedAt: Date=null;
     @DeleteDateColumn()
     deletedAt: Date=null;
	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
     createdAt: Date;
    
    constructor(eventAccess?: Partial<EventAccess>) {
		Object.assign(this, eventAccess);
	  }
}
