//24/04/2024 10:03
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { NonStaff } from './BaseUser';
import { House } from './House';
import { PasswordManager } from '../utilities/passwordmanager';
import {EstateRequest, UserRequest} from "./Request";

const passwordManager = new PasswordManager();

@Entity()
export class EstateManager extends NonStaff {
    // Use only to create a new instance of EstateManager,
    // one which isn't stored in the database
    // This function calls getHashedKey to set the plaintext password.
    initialize(
        email: string,
        fullname: string,
        password: string,
        photoURL: string,
        address: string,
        serviceType: number,
        estate: string,
    ) {
        this.email = email;
        this.fullname = fullname;
        this.password = passwordManager.getHashedKey(password);
        this.photoURL = photoURL;
        this.address = address;
        this.serviceType = serviceType;
        this.estate = estate;
    }

    static accountType: number = 2;

    @Column({ type: 'varchar', length: 40 })
    estate: string;

    @OneToMany(() => House, (house) => house.manager)
    houses: Relation<House>[];

    @OneToMany(() => EstateRequest, (request) => request.client)
    requests: Relation<EstateRequest>[];
}
