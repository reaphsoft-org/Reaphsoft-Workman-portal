import { Entity, Column } from 'typeorm';
import { NonStaff } from './BaseUser';

@Entity()
export class User extends NonStaff {
  accountType: number = 1;

  @Column({ type: 'varchar', length: 20 })
  apartment: string;
}
