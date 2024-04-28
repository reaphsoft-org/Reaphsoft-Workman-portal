// 27/04/2024 13:13
// reaphsoft-workman
// github.com/kahlflekzy

import { BaseUser } from './BaseUser';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { Service } from './Service';

@Entity({
    orderBy: {
        fullname: 'ASC',
    },
})
export class Workman extends BaseUser {
    @Column({ type: 'varchar', length: 100 })
    address: string;

    @Column({ type: 'varchar', length: 15 })
    phone: string;

    @Column({
        type: 'varchar',
        length: 100,
        comment: 'for example, monday - friday, 10-12pm NGN time',
    })
    availability: string;

    @ManyToOne(() => Service)
    service: Relation<Service>;

    // unable to get requests here because there are two types of requests
}
