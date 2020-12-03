import { State, Visibility } from 'src/schema/types.schema';
import { Entity, ObjectID, ObjectIdColumn, Column, UpdateDateColumn, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { EventTeam } from './eventTeam.entity';
import { Task } from './task.entity';
@Entity({
    name: 'EventTeamTask',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class EventTeamTask {
    @ObjectIdColumn()
    _id: ObjectID
    @Column()
   state:State
   @Column()
   visibility:Visibility
    @ManyToOne(() => EventTeam, eventTeam => eventTeam.teamsTasks, {

        nullable: false,
        cascade: ["remove", "update"]
      }) eventTeam: EventTeam;
      @OneToMany(() => Task, task => task.eventTeamTask)
      tasks: Task[];
      @Column()
      updatedAt: Date=null;
      @DeleteDateColumn()
      deletedAt: Date=null;
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;
    constructor(eventTeamTask?: Partial<EventTeamTask>) {
        Object.assign(this, eventTeamTask);
    }
}
