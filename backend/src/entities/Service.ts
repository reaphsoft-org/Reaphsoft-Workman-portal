// 27/04/2024 11:29
// reaphsoft-workman
// github.com/kahlflekzy

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column({ type: 'varchar', default: '' })
    description: string;
}
