
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ObjectID, ObjectIdColumn} from 'typeorm';

@Entity({
    name: 'EatWithStranger',
    orderBy: {
        createdAt: 'ASC'
    }
})

export class EatWithStranger  {
    @ObjectIdColumn()
    _id: ObjectID
    @ObjectIdColumn()
    strangerId:ObjectID
    
    @ObjectIdColumn()
    restaurantId :ObjectID
    @Column()
   address:string
   @Column()
   updatedAt: Date=null;
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   createdAt: Date;
   @DeleteDateColumn()
deletedAt: Date=null;
   constructor(eatWithStranger: Partial<EatWithStranger>) {
    Object.assign(this, eatWithStranger);

  }
}
