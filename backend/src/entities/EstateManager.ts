//24/04/2024 10:03
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { NonStaff } from './BaseUser';
import { House } from './House';

@Entity()
export class EstateManager extends NonStaff {
  static accountType: number = 2;

  @Column({ type: 'varchar', length: 40 })
  estate: string;

  @OneToMany(() => House, (house) => house.manager)
  houses: Relation<House>[];
}
