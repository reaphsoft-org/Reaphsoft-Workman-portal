// 27/04/2024 13:25
// reaphsoft-workman
// github.com/kahlflekzy

import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';
import { User } from './User';
import { EstateManager } from './EstateManager';
import { Workman } from './Workman';

abstract class RequestBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    accepted: boolean;

    @Column({
        type: 'timestamp with time zone',
        comment: 'date and time the client requires the service.',
    })
    date_required: Date;

    @CreateDateColumn()
    date_created: Date;

    @Column({ type: 'timestamp with time zone', nullable: true })
    date_accepted: Date | null;

    @Column({ type: 'timestamp with time zone', nullable: true })
    date_completed: Date | null;

    @ManyToOne(() => Workman, { onDelete: 'SET NULL' })
    worker: Relation<Workman>;
}

@Entity({
    orderBy: {
        date_created: 'ASC',
    },
})
export class UserRequest extends RequestBase {
    @ManyToOne(() => User, (user) => user.requests, { onDelete: 'SET NULL' })
    client: Relation<User>;
}

@Entity({
    orderBy: {
        date_created: 'ASC',
    },
})
export class EstateRequest extends RequestBase {
    @ManyToOne(() => EstateManager, (manager) => manager.requests, {
        onDelete: 'SET NULL',
    })
    client: Relation<EstateManager>;
}
