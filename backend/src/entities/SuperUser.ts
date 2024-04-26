// 24/04/2024 17:50
// reaphsoft-workman
// github.com/kahlflekzy

import { BaseUser } from './BaseUser';
import { Column, Entity } from 'typeorm';

@Entity()
export class SuperUser extends BaseUser {
    @Column({ default: true })
    is_active: boolean;
}
