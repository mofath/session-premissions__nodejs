import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  Default,
  IsUUID,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import User from './User';

@Table({
  modelName: 'session',
})
export default class Session extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: string;

  @AllowNull(false)
  @Column
  scope: string;

  @AllowNull(false)
  @Column({
    field: 'token_hash',
  })
  tokenHash: string;

  @Column({
    field: 'valid_until',
  })
  validUntil: Date;

  @Column({
    field: 'user_agent',
  })
  userAgent: string

  @AllowNull(false)
  @Default(false)
  @Column
  revoked: boolean;
}
