import Container from 'typedi';
import { UnauthorizedError } from '../core/errors';
import { JWT } from '../core/utils/jwt';
import SessionRepository from '../repositories/session.repository';
import UserRepository from '../repositories/user.repository';
import { Role } from '../core/domain/enum';
import 'reflect-metadata';

export class GetAccessTokenUseCase {
  public static async execute(
    refreshToken: string,
    userAgent
  ): Promise<string> {
    const sessionRepo = Container.get(SessionRepository);
    const userRepo = Container.get(UserRepository);

    const tokenHash = JWT.hashRefreshToken(refreshToken);
    const session = await sessionRepo.findOne({ tokenHash });

    if (session === null) throw new UnauthorizedError(`Session not found`);
    if (session.validUntil < new Date())
      throw new UnauthorizedError(`Session has expired`);
    if (session.revoked) throw new UnauthorizedError(`Session was revoked`);

    const userId = session.userId;
    const user = await userRepo.findOne({ id: userId });

    const scope =
      user.isVerified || user?.role === Role.SUPERVISOR
        ? ['resource:read', 'resource:write']
        : ['resource:read'];

    const accessToken = JWT.generateAccessToken(
      session.userId,
      scope,
      session.id,
      userAgent
    );

    return accessToken;
  }
}
