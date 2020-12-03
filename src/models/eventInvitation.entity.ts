import { Entity, ObjectID, ObjectIdColumn, Column, UpdateDateColumn, ManyToOne, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity({
    name: 'EventInvitation',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class EventInvitation {
    @ObjectIdColumn()
    _id: ObjectID

    @ObjectIdColumn()
    userId: ObjectID
    @ManyToOne(() => Event, event => event.invitations, {
        nullable: false,
        cascade: ["remove", "update"]
      })event:Event
  
      @Column()
      updatedAt: Date=null;
      @DeleteDateColumn()
      deletedAt: Date=null;
	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
     createdAt: Date;

    constructor(eventInvitation?: Partial<EventInvitation>) {
		Object.assign(this, eventInvitation);
	  }
}
