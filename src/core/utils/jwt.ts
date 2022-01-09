import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { BadRequestError } from '../errors';

export class JWT {
  public static extractToken(req: Request) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer '))
      throw new BadRequestError('Bad Request');

    return authHeader.substring(7, authHeader.length);
  }

  public static  generateRefreshToken() {
    const refreshToken = crypto
      .randomBytes(Math.ceil(500 / 2))
      .toString('hex')
      .slice(0, 500);

    const refreshTokenHash =  this.hashRefreshToken(refreshToken);

    return { refreshToken, refreshTokenHash };
  }

  public static hashRefreshToken(refreshToken: string) {
    return crypto.createHash('sha256').update(refreshToken).digest('hex');
  }

  public static generateAccessToken(
    userId: string,
    scope: string[],
    sessionId: string
  ) {
    return jwt.sign(
      { user_id: userId, scope, session_id: sessionId },
      'jwtSecret',
      {
        algorithm: 'HS256',
        audience: 'user',
        issuer: 'mofath',
        expiresIn: 24 * 60 * 60, //  valid 24 hour,
      }
    );
  }

  public static verifyAccessToken(req: Request) {
    const token = this.extractToken(req);
    return jwt.verify(token, 'jwtSecret', {
      issuer: 'mofath',
      audience: 'user',
    });
  }
}
