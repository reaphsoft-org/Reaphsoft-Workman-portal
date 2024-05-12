// 12/05/2024 13:24
// reaphsoft-workman
// github.com/kahlflekzy

import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

abstract class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    stars: number;

    @Column('text')
    comment: string;

    @CreateDateColumn()
    date: Date;
}

@Entity()
export class ClientRating extends Rating {}

@Entity()
export class WorkmanRating extends Rating {}
