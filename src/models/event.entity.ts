
import { PassType } from 'src/schema/types.schema';
import { Entity, ObjectID, ObjectIdColumn, Column, UpdateDateColumn, OneToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { EventLog } from '.';

import { EventAccess } from './eventAccess.entity';
import { EventInvitation } from './eventInvitation.entity';
import { EventPacks } from './eventPacks.entity';
import { EventTeam } from './eventTeam.entity';

@Entity({
	name: 'Event',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class Event {
	
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
	@OneToMany(() => EventLog, eventLog => eventLog.event)
	logs: EventLog[];
	@OneToMany(() => EventTeam, eventTeam => eventTeam.event)
	teams: EventTeam[];
	@OneToMany(() => EventPacks, eventPacks => eventPacks.event)
	packs: EventPacks[];
	@OneToMany(() => EventAccess, eventAccess => eventAccess.event)
	accesses: EventAccess[];
	@OneToMany(() => EventInvitation, EventInvitation => EventInvitation.event)
    invitations: EventInvitation[];
	@Column()
     updatedAt: Date=null;
	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	 createdAt: Date;
	 @DeleteDateColumn()
  deletedAt: Date=null;
	constructor(event: Partial<Event>) {
		Object.assign(this, event);
	  }
}
