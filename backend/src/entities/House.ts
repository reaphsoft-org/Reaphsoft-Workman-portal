// 24/04/2024 10:43
// reaphsoft-workman
// github.com/kahlflekzy

import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';
import { EstateManager } from './EstateManager';

@Entity()
export class House {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ type: 'varchar' })
    number: string;

    @Column({ type: 'boolean', default: false })
    vacant: boolean;

    @Column({
        type: 'varchar',
        length: 40,
        comment: "occupant's name, set to empty string if house is vacant",
    })
    name: string;

    @ManyToOne(() => EstateManager, (manager) => manager.houses, {
        onDelete: 'CASCADE',
    })
    manager: Relation<EstateManager>;
}
