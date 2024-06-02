import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { EstateManager } from './entities/EstateManager';
import { House } from './entities/House';
import { SuperUser } from './entities/SuperUser';
import { Service } from './entities/Service';
import { EstateRequest, UserRequest } from './entities/Request';
import { Workman } from './entities/Workman';
import { ClientRating, WorkmanRating } from './entities/rating';
import {VerificationToken} from "./entities/BaseUser";

let dbName: string;
let dropOption: boolean;
if (process.env.NODE_ENV === 'test') {
    dbName = 'reaphsoft_workmen_test.db';
    dropOption = true;
} else {
    dbName = 'reaphsoft_workmen.db';
    dropOption = false;
}

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'reaphsoft',
    password: 'reaphsoft',
    database: dbName,
    synchronize: true,
    dropSchema: dropOption,
    logging: false,
    entities: [
        SuperUser,
        User,
        EstateManager,
        House,
        Service,
        Workman,
        EstateRequest,
        UserRequest,
        ClientRating,
        WorkmanRating,
        VerificationToken,
    ],
    migrations: ['./migrations/*.ts'],
    subscribers: ['./subscribers/*.ts'],
});
