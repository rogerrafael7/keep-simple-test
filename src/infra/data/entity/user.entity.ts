import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserLogEntity } from '@/infra/data/entity/user-log.entity';
import { UserModel } from '@/domain/model/user.model';
import { DateString } from '@/infra/shared/types/common.type';

@Entity('users')
export class UserEntity implements UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tax_id' })
  taxId: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ name: 'birth_date' })
  birthDate: DateString;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  neighborhood: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column({
    name: 'record_status',
    type: 'enum',
    enum: ['active', 'removed'],
    default: 'active',
  })
  recordStatus: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'removed_at', nullable: true })
  removedAt: Date | null;

  @OneToMany(() => UserLogEntity, (log) => log.user)
  logs: UserLogEntity[];
}
