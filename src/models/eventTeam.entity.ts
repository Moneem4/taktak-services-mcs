import { Entity, ObjectID, ObjectIdColumn, Column, UpdateDateColumn, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Event } from './event.entity';
import { EventTeamTask } from './eventTeamTask.entity';
@Entity({
    name: 'EventTeam',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class EventTeam {
    @ObjectIdColumn()
    _id: ObjectID
    @Column()
    teams: [ObjectID]
    @Column()
    role: string
    @Column()
    description: string
    @ManyToOne(() => Event, event => event.teams, {

        nullable: false,
        cascade: ["remove", "update"]
      }) event: Event;
      @OneToMany(() => EventTeamTask, eventTeamTask => eventTeamTask.eventTeam)
      teamsTasks: EventTeamTask[];
    @Column()
    updatedAt: Date=null;
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;
    @DeleteDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    deletedAt: Date=null;
    constructor(eventTeam?: Partial<EventTeam>) {
        Object.assign(this, eventTeam);
    }
}
