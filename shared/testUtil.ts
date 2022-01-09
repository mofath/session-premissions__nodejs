import { SuperTest, Test } from 'supertest';

export function registerUserReq(
  request: SuperTest<Test>,
  endpoint: string,
  body: Object
) {
  return request
    .post(endpoint)
    .set('Content-Type', 'application/json')
    .send(body);
}
