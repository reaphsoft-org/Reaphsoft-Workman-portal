// 18/06/2024 15:56
// reaphsoft-workman
// github.com/kahlflekzy

import { User } from './entities/User';
import * as process from 'process';
import Mailman from './utilities/mailman';

const email = process.argv[2];
if (!email) {
    console.log(`Please provide an email address: ${email}`);
    process.exit(1);
}

const user = new User();
user.fullname = `Ralph Soft`;
user.email = email;

const mailman = new Mailman();
mailman.sendVerificationCode(`some token`, user).then((r) => {
    console.log(r);
});
