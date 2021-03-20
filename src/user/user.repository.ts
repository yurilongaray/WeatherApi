import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { UserCollection } from '../collections/user.collection';
import { MONGO_CONNECTION } from '../connections/mongo.connection';

@Injectable()
export class UserRepository {

    public save(user: UserCollection) {

        return getManager(MONGO_CONNECTION).save(user);
    }
}
