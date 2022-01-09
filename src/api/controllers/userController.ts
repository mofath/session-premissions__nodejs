import { Request, Response } from 'express';
import { CreateUserDto, UserLoginDto } from '../../core/dto';
import { BadRequestError } from '../../core/errors';
import { CreateUserUseCase } from '../../use-cases/createUser.case';
import { GetAccessTokenUseCase } from '../../use-cases/getAccessToken.case';
import { LoginUserUseCase } from '../../use-cases/loginUser.case';
import { asyncHandler } from '../middleware';

function UserController() {
  async function createUser(req: Request, res: Response) {
    await CreateUserUseCase.execute(req.body as CreateUserDto);
    return res.status(201).json({
      message: 'User created successfully',
      success: true,
    });
  }

  async function login(req: Request, res: Response) {
    const result = await LoginUserUseCase.execute(req.body as UserLoginDto);
    return res.status(200).json({
      user: {
        ...result.user,
        refreshToken: result.refreshToken,
        accessToken: result.accessToken,
      },
      message: 'Authenticated',
      success: true,
    });
  }

  async function getAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new BadRequestError('Invalid params');

    const accessToken = await GetAccessTokenUseCase.execute(refreshToken);
    return res.status(200).json({
      accessToken,
      message: 'Authenticated',
      success: true,
    });
  }

  return Object.freeze({
    createUser: asyncHandler(createUser),
    login: asyncHandler(login),
    getAccessToken: asyncHandler(getAccessToken),
  });
}

export default UserController;
