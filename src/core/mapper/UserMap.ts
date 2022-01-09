import { User } from '../domain/user';

export class UserMap {
  public static toPersistence(user: Partial<User>): any {
    return {
      id: user?.id?.toString(),
      username: user?.username,
      password: user?.password?.toString(),
      role: user?.role,
      is_verified: user.isVerified,
    };
  }

  public static toDomain(raw: any): Partial<User> {
    return {
      id: raw?.id?.toString(),
      username: raw?.username,
      password: raw?.password?.toString(),
      role: raw?.role,
      isVerified: raw?.is_verified,
    };
  }
}
