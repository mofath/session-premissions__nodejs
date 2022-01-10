import 'mocha';
import expect from 'expect';
import { demoUser } from '../../shared/testData';
import getTestApp from '../../shared/getTestApp';
import flushTests from '../../shared/flushTests';
import { makePostRequest } from '../../shared/testUtil';
import { registerUser } from '../../shared/getTestUser';

describe('Login POST route', () => {
  let server: any;

  before(async () => {
    server = await getTestApp();
    await server.start();
    await flushTests();
    await registerUser(server.request, demoUser);
  });

  it('should return user and session for valid credentials', async () => {
    const res = await makePostRequest(
      server.request,
      '/api/v1/auth/login',
      demoUser
    );
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('accessToken');
    expect(res.body.user).toHaveProperty('refreshToken');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user).toHaveProperty('username', demoUser.username);
  });
  
  it('should return 401 for invalid password', async () => {
    const res = await makePostRequest(server.request, '/api/v1/auth/login', {
      ...demoUser,
      password: 'invlaid-password',
    });
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid Credentials');
  });

  it('should return 401 for non-exist username', async () => {
    const res = await makePostRequest(server.request, '/api/v1/auth/login', {
      ...demoUser,
      username: 'invlaid-username',
    });
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid Credentials');
  });

  after(async () => {
    server.stop();
  });
});
