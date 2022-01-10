import 'mocha';
import expect from 'expect';
import {
  userInvalidParam,
  demoUser,
  userExist,
  userInvalidCred,
} from '../../shared/testData';
import getTestApp from '../../shared/getTestApp';
import flushTests from '../../shared/flushTests';
import { makePostRequest } from '../../shared/testUtil';

describe('Register POST route', () => {
  let server: any;

  before(async () => {
    server = await getTestApp();
    await server.start();
    await flushTests();
  });

  it('should return 201 for registering valid user', async () => {
    const registerRes = await makePostRequest(
      server.request,
      '/api/v1/auth/register',
      demoUser
    );
    expect(registerRes.status).toEqual(201);
  });

  it('should return 409 for registering existing user', async () => {
    const registerRes = await makePostRequest(
      server.request,
      '/api/v1/auth/register',
      userExist
    );
    expect(registerRes.status).toEqual(409);
  });

  it('should return 400 for registering with bad params, no password', async () => {
    const registerRes = await makePostRequest(
      server.request,
      '/api/v1/auth/register',
      userInvalidParam
    );
    expect(registerRes.status).toEqual(400);
  });

  it('should return 409 for registering with invalid credintials', async () => {
    const registerRes = await makePostRequest(
      server.request,
      '/api/v1/auth/register',
      userInvalidCred
    );
    expect(registerRes.status).toEqual(409);
  });

  after(async () => {
    server.stop();
  });
});
