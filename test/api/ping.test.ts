import 'mocha';
import expect from 'expect';
import getTestApp from '../../shared/getTestApp';

describe('Ping GET route', () => {
  let server: any;

  before(async () => {
    server = await getTestApp();
    server.start();
  });

  it('should return a 200 for ping', async () => {
    const pingRes = await server.request.get('/api/v1/ping').send();
    expect(pingRes.status).toEqual(200);
  });

  after(async () => {
    server.stop();
  });
});
