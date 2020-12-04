
import { Entity, ObjectID, ObjectIdColumn} from 'typeorm';
import { Service } from './service.entity';
@Entity({
    name: 'EatWithStranger',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class EatWithStranger extends Service {
    @ObjectIdColumn()
    _id: ObjectID
  
   
}
