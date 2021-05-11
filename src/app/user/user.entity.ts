import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { EncryptionHelper } from '../../auth/helpers/encryption'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'first_name', type: 'varchar', nullable: false })
  firstName: string

  @Column({ name: 'last_name', type: 'varchar', nullable: false })
  lastName: string

  @Column({ name: 'email', type: 'varchar', nullable: false })
  @Index()
  email: string

  @Column({ name: 'password', type: 'varchar', nullable: false })
  password: string

  @Column({ name: 'is_active', type: 'tinyint', width: 1, default: 1 })
  isActive: number

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: string

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: string

  @BeforeInsert()
  async encryptPassword() {
    const encryptionHelper = new EncryptionHelper()
    this.password = await encryptionHelper.hash(this.password)
  }

  constructor(data?: Partial<UserEntity>) {
    Object.assign(this, data)
  }
}
