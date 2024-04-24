//24/04/2024 10:25

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class BaseUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 40 })
  fullname: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 150 })
  photoURL: string;

  @CreateDateColumn()
  date_joined: string;

  @UpdateDateColumn()
  last_visited: string;
}

export abstract class NonStaff extends BaseUser {
  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'integer' })
  serviceType: number;
}
