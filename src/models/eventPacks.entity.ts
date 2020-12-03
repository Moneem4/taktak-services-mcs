import { Entity, ObjectIdColumn ,Column, UpdateDateColumn, ObjectID, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm'
import { EventPackUser } from './eventPackUser.entity';
import { Event } from './event.entity';
@Entity({
    name: 'EventPacks',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class EventPacks {
    @ObjectIdColumn()
    _id: ObjectID
    @Column()
    price: number
    @Column()
    capacity: number
    @Column()
    title: string
    @Column()
    description: string
    @ManyToOne(() => Event, event => event.packs, {

        nullable: false,
        cascade: ["remove", "update"]
      }) event: Event;
      @OneToMany(() => EventPackUser, eventPackUser => eventPackUser.eventPacks)
	packsUsers: EventPackUser[];
    @Column()
    updatedAt: Date=null;
    @DeleteDateColumn()
    deletedAt: Date=null;
	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
     createdAt: Date;

    constructor(eventPacks?: Partial<EventPacks>) {
		Object.assign(this, eventPacks);
	  }
}
