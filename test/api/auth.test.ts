import 'mocha';
import expect from 'expect';
import { registerUser } from '../../src/utils/testing/authTestUtil.ts';
import { getTestApp } from '../../src/utils/testing/getTestApp.ts';
import { userInvalid, user, userExist } from '../../src/utils/testing/data';


describe('Ping GET route', () => {
  let server: any;

  before(async () => {
    server = await getTestApp();
    server.start();
  });

  it('should return 201 for register valid user', async () => {
    const registerRes = await registerUser(
      server.request,
      '/api/v1/auth/register',
      user
    );
    expect(registerRes.status).toEqual(201);
  });

  it('should return 409 for registering existing user', async () => {
    const registerRes = await registerUser(
      server.request,
      '/api/v1/auth/register',
      userExist
    );
    expect(registerRes.status).toEqual(409);
  });

  it('should return 400 for registering with invalid credintials', async () => {
    const registerRes = await registerUser(
      server.request,
      '/api/v1/auth/register',
      userInvalid
    );
    expect(registerRes.status).toEqual(400);
  });

  after(async () => {
    server.stop();
  });
});
