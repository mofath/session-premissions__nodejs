import 'mocha';
import expect from 'expect';
import { demoUser } from '../../shared/testData';
import getTestApp from '../../shared/getTestApp';
import flushTests from '../../shared/flushTests';
import { makePostRequest, makeGetRequest } from '../../shared/testUtil';
import { getAuthUser } from '../../shared/getTestUser';

describe('Resources routes', () => {
  let server: any;
  let token: any;
  let item: any;

  before(async () => {
    server = await getTestApp();
    await server.start();
    await flushTests();
    const user = await getAuthUser(server.request, demoUser);
    token = user.accessToken;
  });

  it('should return 400 for accessing resource with no token', async () => {
    // No toke
    const res = await makeGetRequest(server.request, '/api/v1/resource');
    expect(res.status).toEqual(400);
  });

  it('should return 200 for accessing resource with token and valid scope', async () => {
    // default user scope : [resource: read]
    // /api/v1/resource scope : [resource: read]
    const res = await makeGetRequest(server.request, '/api/v1/resource', token);
    expect(res.status).toEqual(200);
  });

  it('should return 401 for accessing resource with token and invalid scope', async () => {
    // default user scope : [resource: read]
    // /api/v1/resource scope : [resource: write]
    const res = await makePostRequest(
      server.request,
      '/api/v1/resource',
      {
        title: 'item-1',
      },
      token
    );
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('message', `Doesn't have scope required`);
  });

  after(async () => {
    server.stop();
  });
});
