import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
  UpdatedAt,
  Unique,
  BeforeCreate,
  Default,
} from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import { Role } from '../../core/domain/enum';

@Table({
  modelName: 'user',
})
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @Column
  username: string;

  @Column
  password: string;

  @Default(Role.USER)
  @Column({ type: DataType.ENUM({ values: Object.keys(Role) }) })
  role: Role;

  @Column({ field: 'created_at' })
  @CreatedAt
  createdAt: Date;

  @Column({ field: 'updated_at' })
  @UpdatedAt
  updatedAt: Date;

  @Default(false)
  @Column({ field: 'is_verified' })
  isVerified: boolean;

  @BeforeCreate
  static async hashPassword(instance: User) {
    if (instance.password) {
      instance.password = await bcrypt.hash(`${instance.password}`, 10);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password || '');
  }
}
