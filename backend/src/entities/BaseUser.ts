//24/04/2024 10:25

import {
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PasswordManager } from '../utilities/passwordmanager';
import * as path from 'path';
import * as fs from 'fs';

const MEDIA_DIR = path.join(__dirname, '..', '..', 'media/u');
if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR, { recursive: true });
}

export abstract class BaseUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 40 })
    fullname: string;

    @Column({ type: 'varchar', length: 256 })
    password: string;

    @Column({ type: 'varchar', length: 150, default: '' })
    photoURL: string;

    @CreateDateColumn()
    date_joined: string;

    @UpdateDateColumn()
    last_visited: string;

    private readonly passwordManager = new PasswordManager();
    private readonly uploadPath = 'media/u';

    setValues(hashPassword: boolean = false) {
        if (hashPassword) {
            this.password = this.passwordManager.getHashedKey(this.password);
        }
        this.fullname = this.toTitleCase(this.fullname.trim());
    }

    private toTitleCase(str: string): string {
        return str.replace(/\w\S*/g, function (txt: string) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        });
    }

    async saveFile(file: any, prefix: string = 'user') {
        if (file != null && file.mimetype.startsWith('image/')) {
            // todo add test case for when a object posts a file which doesn't have an image mime type
            // todo test for jpegs, currently tests for png
            const extension: string = file.originalname.split('.').pop();
            const filename =
                this.email.replace('@', '').replace('.', '-') + `.${extension}`;
            this.photoURL = await this.savePhoto(file, `${prefix}_${filename}`);
        }
    }

    async savePhoto(
        photo: Express.Multer.File,
        filename: string,
    ): Promise<string> {
        const fullPath = path.join(MEDIA_DIR, filename);
        let imgPath = path.join(this.uploadPath, filename);
        fs.writeFile(fullPath, photo.buffer, (err) => {
            if (err) {
                imgPath = '';
            }
        });
        return imgPath;
    }

    deletePhoto() {
        if (this.photoURL !== '') {
            const photoPath = path.join(MEDIA_DIR, '..', '..', this.photoURL);
            fs.rmSync(photoPath);
        }
    }

    baseValidations() {
        if (
            this.email === undefined ||
            this.email === '' ||
            !this.email.includes('@')
        ) {
            return { status: false, resp: 'Invalid email address' };
        }
        if (this.password === undefined || this.password === '') {
            // add other password validation
            return { status: false, resp: 'Invalid password' };
        }
        if (this.fullname === undefined || this.fullname === '') {
            return { status: false, resp: 'Invalid Fullname' };
        }
        return { status: true, resp: '' };
    }

    checkPassword(password: string) {
        return this.passwordManager.comparePassword(password, this.password);
    }
}

export abstract class NonStaff extends BaseUser {
    @Column({ type: 'varchar', length: 100 })
    address: string;

    @Column({ type: 'integer' })
    serviceType: number;

    // validate email, fullname, address and serviceType
    // validate passwords separately
    generalValidations() {
        const check = this.baseValidations();
        if (!check.status) return check;
        if (this.address === undefined || this.address === '') {
            return { status: false, resp: 'Invalid address' };
        }
        if (
            this.serviceType === undefined ||
            this.serviceType < 1 ||
            this.serviceType > 2
        ) {
            return { status: false, resp: 'Invalid service type' };
        }
        return { status: true, resp: '' };
    }
}
