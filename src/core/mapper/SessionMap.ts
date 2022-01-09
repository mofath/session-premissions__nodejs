import { Session } from '../domain/session';

export class SessionMap {
  public static toPersistence(session: Partial<Session>): any {
    return {
      id: session?.id?.toString(),
      user_id: session?.userId,
      scope: session?.scope,
      token_hash: session?.tokenHash,
      valid_until: session?.validUntil,
      revoked: session?.revoked,
    };
  }

  public static toDomain(raw: any): Partial<Session> {
    return {
      id: raw?.id?.toString(),
      userId: raw?.userId,
      scope: raw?.scope,
      tokenHash: raw?.token_hash,
      validUntil: raw?.valid_until,
      revoked: raw?.revoked,
    };
  }
}
