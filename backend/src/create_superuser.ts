// 27/04/2024 19:53
// reaphsoft-workman
// github.com/kahlflekzy

import * as process from 'process';
import { AppDataSource } from './data-source';
import { SuperUser } from './entities/SuperUser';
import { PasswordManager } from './utilities/passwordmanager';

const email = process.argv[2];
const password = process.argv[3];
const firstName = process.argv[4];
const lastName = process.argv[5];

if (!email || !password || !firstName || !lastName) {
    console.log(email, password, firstName, lastName);
    console.log('Please provide email password firstname lastname');
    process.exit(1);
}

const passwordManager = new PasswordManager();

console.log('Initializing data source');
if (!AppDataSource.isInitialized) {
    AppDataSource.initialize()
        .then(async () => {
            console.log('Creating superuser');
            const user = new SuperUser();
            user.email = email;
            user.fullname = `${lastName} ${firstName}`;
            user.password = passwordManager.getHashedKey(password);
            user.photoURL = '';
            const repo = AppDataSource.getRepository(SuperUser);
            await repo.save(user);
            console.log(`Saved user with id ${user.id}`);
        })
        .catch((e) => {
            console.log(e);
        });
}
