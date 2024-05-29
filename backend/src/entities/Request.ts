// 27/04/2024 13:25
// reaphsoft-workman
// github.com/kahlflekzy

import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';
import { User } from './User';
import { EstateManager } from './EstateManager';
import { Workman } from './Workman';
import { ClientRating, WorkmanRating } from './rating';
import { BASE_MEDIA_DIR, MEDIA_DIR } from '../utilities/konstants';
import * as fs from 'fs';
import * as path from 'path';

const UPLOAD_DIR = path.join(MEDIA_DIR, 'r');
const uploadPath = `${BASE_MEDIA_DIR}/r`;
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

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

    @OneToOne(() => ClientRating)
    @JoinColumn()
    client_rating: Relation<ClientRating>;

    @OneToOne(() => WorkmanRating)
    @JoinColumn()
    worker_rating: Relation<WorkmanRating>;

    @Column({ type: 'varchar', length: 150, default: '' })
    beforePhoto: string;

    @Column({ type: 'varchar', length: 150, default: '' })
    afterPhoto: string;

    async uploadPhoto(file: Express.Multer.File, before: boolean = true) {
        if (file.mimetype.startsWith('image/')) {
            const extension: string = <string>(
                file.originalname.split('.').pop()
            );
            const filename = `${before ? 'b' : 'a'}_${this.id}.${extension}`;
            if (before) this.beforePhoto = await this.savePhoto(file, filename);
            else this.afterPhoto = await this.savePhoto(file, filename);
        }
    }

    private async savePhoto(
        photo: Express.Multer.File,
        filename: string,
    ): Promise<string> {
        const fullPath = path.join(UPLOAD_DIR, filename);
        let imgPath = path.join(uploadPath, filename);
        fs.writeFile(fullPath, photo.buffer, (err) => {
            if (err) {
                imgPath = '';
            }
        });
        return imgPath;
    }
}

@Entity({
    orderBy: {
        date_created: 'DESC',
    },
})
export class UserRequest extends RequestBase {
    @ManyToOne(() => User, (user) => user.requests, { onDelete: 'SET NULL' })
    client: Relation<User>;
}

@Entity({
    orderBy: {
        date_created: 'DESC',
    },
})
export class EstateRequest extends RequestBase {
    @ManyToOne(() => EstateManager, (manager) => manager.requests, {
        onDelete: 'SET NULL',
    })
    client: Relation<EstateManager>;
}
