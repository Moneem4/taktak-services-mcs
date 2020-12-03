import { State, Visibility } from 'src/schema/types.schema';
import { Entity, ObjectID, ObjectIdColumn, Column, UpdateDateColumn, ManyToOne, CreateDateColumn, OneToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { EventTeamTask } from './eventTeamTask.entity';
@Entity({
    name: 'Task',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Task {
    @ObjectIdColumn()
    _id: ObjectID
    @ObjectIdColumn()
    creatorId: ObjectID
    @ObjectIdColumn()
    userId: ObjectID
    @ObjectIdColumn()
    updateBy: ObjectID
    @Column()
   nom:string
   @Column()
   description:string
   @Column()
   state:State
   @Column()
   visibility:Visibility
   @Column()
   conditions:string
    @ManyToOne(() => EventTeamTask, eventTeamTask => eventTeamTask.tasks, {

        nullable: false,
        cascade: ["remove", "update"]
      }) eventTeamTask: EventTeamTask;
      @Column()
      updatedAt: Date=null;
      @DeleteDateColumn()
      deletedAt: Date=null;
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;
    constructor(task?: Partial<Task>) {
        Object.assign(this, task);
    }
}
