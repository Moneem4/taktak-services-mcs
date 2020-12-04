import { Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Service } from './service.entity';
@Entity({
    name: 'FlashSave',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class FlashSave extends Service {
    @ObjectIdColumn()
    _id: ObjectID

}
