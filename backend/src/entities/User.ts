import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  accountType: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 40 })
  fullname: string;

  @Column({ type: 'varchar', length: 20 })
  apartment: string;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'integer' })
  serviceType: number;

  @Column({ type: 'varchar', length: 150 })
  photoURL: string;
}
