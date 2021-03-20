import { Injectable } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { UserCollection } from '../collections/user.collection';

export const MONGO_CONNECTION = 'mongodb_connection';

@Injectable()
export class MongoConnectionService {

    public async connect() {

        return createConnection({
            name: MONGO_CONNECTION,
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            database: 'new_fleet',
            entities: [UserCollection],
            extra: { useNewUrlParser: true },
            useUnifiedTopology: true,
            synchronize: true
        });
    }
}