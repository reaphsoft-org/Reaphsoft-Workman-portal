import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';

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
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
});
