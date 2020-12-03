import { Entity, ObjectIdColumn ,Column, UpdateDateColumn, ObjectID, ManyToOne, CreateDateColumn, DeleteDateColumn } from 'typeorm'
import { Event } from './event.entity';
@Entity({
    name: 'EventLog',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class EventLog {
    @ObjectIdColumn()
    _id: ObjectID
    @ObjectIdColumn()
    userId: ObjectID
    @Column()
    action: string
    @ManyToOne(() => Event, event => event.logs, {
        nullable: false,
        cascade: ["remove", "update"]
      })event:Event
    
	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
     createdAt: Date;
     @Column()
     updatedAt: Date=null;
     @DeleteDateColumn()
     deletedAt: Date=null;

    constructor(eventLog?: Partial<EventLog>) {
		Object.assign(this, eventLog);
	  }
}
