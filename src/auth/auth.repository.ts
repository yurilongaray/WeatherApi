import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { UserCollection } from '../collections/user.collection';
import { MONGO_CONNECTION } from '../connections/mongo.connection';

@Injectable()
export class AuthRepository {

    public findByEmail(email: string) {

        return getManager(MONGO_CONNECTION).findOne(UserCollection, { email });
    }
}
