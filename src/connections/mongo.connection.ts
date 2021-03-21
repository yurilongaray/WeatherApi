import { Injectable } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { UserCollection } from '../collections/user.collection';

export const MONGO_CONNECTION = 'mongo-connection';
const MONGO_ATLAS = process.env.MONGO_URL;
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';

@Injectable()
export class MongoConnectionService {

    public async connect() {

        const customConfig = MONGO_ATLAS ? { url: MONGO_ATLAS } : { host: MONGO_HOST };

        console.info('Connecting Mongo On:', customConfig);

        return createConnection({
            name: MONGO_CONNECTION,
            type: 'mongodb',
            ...customConfig,
            port: 27017,
            database: 'weather_project',
            entities: [
                UserCollection
            ],
            extra: { useNewUrlParser: true },
            useUnifiedTopology: true,
            synchronize: true
        });
    }
}