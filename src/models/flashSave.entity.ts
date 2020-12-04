import { Column, CreateDateColumn, DeleteDateColumn, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
@Entity({
    name: 'FlashSave',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class FlashSave {
    @ObjectIdColumn()
    _id: ObjectID
    @Column()
    price:number
    @ObjectIdColumn()
    restaurantId: ObjectID
    @Column()
    updatedAt: Date=null;
   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;
    @DeleteDateColumn()
 deletedAt: Date=null;
    constructor(flashSave: Partial<FlashSave>) {
		Object.assign(this, flashSave);
	  }
}
