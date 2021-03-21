import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { UserCollection } from '../collections/user.collection';
import { MONGO_CONNECTION } from '../connections/mongo.connection';
import { UserDTO } from './user.dto';

@Injectable()
export class UserRepository {

    public save(user: UserDTO) {

        const userToSave = new UserCollection();

        userToSave.name = user.name;
        userToSave.email = user.email;
        userToSave.password = user.password;

        return getManager(MONGO_CONNECTION).save(user);
    }

    public findByEmail(email: string) {

        return getManager(MONGO_CONNECTION).findOne(UserCollection, { email });
    }
}
