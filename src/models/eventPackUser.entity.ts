import { EventPackUserType } from 'src/schema/types.schema';
import { Entity, ObjectIdColumn ,Column, UpdateDateColumn, ObjectID, ManyToOne, CreateDateColumn, DeleteDateColumn } from 'typeorm'
import { EventPacks } from './eventPacks.entity';

@Entity({
    name: 'EventPackUser',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class EventPackUser {
    @ObjectIdColumn()
    _id: ObjectID

    @ObjectIdColumn()
    userId: ObjectID

    @Column()
    content: string
   @Column()
   eventPackUserType:EventPackUserType
   @Column()
    quantity: number
    @ManyToOne(() => EventPacks, eventPacks => eventPacks.packsUsers, {

        nullable: false,
        cascade: ["remove", "update"]
      }) eventPacks: EventPacks;
      @Column()
      updatedAt: Date=null;
      @DeleteDateColumn()
      deletedAt: Date=null;
	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
     createdAt: Date;

    constructor(eventPackUser?: Partial<EventPackUser>) {
		Object.assign(this, eventPackUser);
	  }
}
