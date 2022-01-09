import 'mocha';
import expect from 'expect';
import { userInvalid, user, userExist } from '../../shared/testData';
import getTestApp from '../../shared/getTestApp';
import flushTests from '../../shared/flushTests';
import {registerUserReq} from '../../shared/testUtil';

describe('Register POST route', () => {
  let server: any;

  before(async () => {
    server = await getTestApp();
    await server.start();
    flushTests();
  });

  it('should return 201 for register valid user', async () => {
    const registerRes = await registerUserReq(
      server.request,
      '/api/v1/auth/register',
      user
    );
    expect(registerRes.status).toEqual(201);
  });

  it('should return 409 for registering existing user', async () => {
    const registerRes = await registerUserReq(
      server.request,
      '/api/v1/auth/register',
      userExist
    );
    expect(registerRes.status).toEqual(409);
  });

  it('should return 409 for registering with invalid credintials', async () => {
    const registerRes = await registerUserReq(
      server.request,
      '/api/v1/auth/register',
      userInvalid
    );
    expect(registerRes.status).toEqual(409);
  });

  after(async () => {
    server.stop();
  });
});
