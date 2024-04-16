import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'reaphsoft',
  password: 'reaphsoft',
  database: 'reaphsoft_workmen.db',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
});
