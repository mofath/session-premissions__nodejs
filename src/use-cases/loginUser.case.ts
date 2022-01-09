import Container from 'typedi';
import { UnauthorizedError } from '../core/errors';
import { JWT } from '../core/utils/jwt';
import SessionRepository from '../repositories/session.repository';
import UserRepository from '../repositories/user.repository';
import { Role } from '../core/domain/enum';
import 'reflect-metadata';

export class LoginUserUseCase {
  public static async execute({ username, password }): Promise<any> {
    const userRepo = Container.get(UserRepository);
    const sessionRepo = Container.get(SessionRepository);

    const foundUser = await userRepo.findOne({ username });
    if (!foundUser) throw new UnauthorizedError('Invalid Credentials');

    const isPasswordValid = await foundUser.comparePassword(`${password}`);
    if (!isPasswordValid) throw new UnauthorizedError('Invalid Credentials');

    const scope =
      foundUser.isVerified || foundUser.role === Role.SUPERVISOR
        ? ['products:read']
        : ['products:read', 'products:write'];

    const { refreshToken, refreshTokenHash } = JWT.generateRefreshToken();

    const newSession = {
      userId: foundUser.id,
      scope: scope.join(','),
      validUntil: new Date(Date.now() + 60 * 1000),
      tokenHash: refreshTokenHash,
    };

    const session = await sessionRepo.save(newSession);
    const sessionId = session?.id as string;
    const accessToken = JWT.generateAccessToken(foundUser.id, scope, sessionId);
    const user = foundUser.get({ plain: true });
    delete user.password;

    return {
      user,
      refreshToken,
      accessToken,
      sessionId,
    };
  }
}
