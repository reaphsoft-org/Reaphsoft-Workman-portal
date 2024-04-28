import { Entity, Column, OneToMany, Relation } from 'typeorm';
import { NonStaff } from './BaseUser';
import { UserRequest } from './Request';

@Entity()
export class User extends NonStaff {
    static accountType: number = 1;

    @Column({ type: 'varchar', length: 20 })
    apartment: string;

    @OneToMany(() => UserRequest, (request) => request.client)
    requests: Relation<UserRequest>[];

    runValidations() {
        const check = this.generalValidations();
        if (!check) return check;
        if (this.apartment === undefined || this.apartment === '') {
            return { status: false, resp: 'Invalid apartment number' };
        }
        return { status: true, resp: '' };
    }
}
