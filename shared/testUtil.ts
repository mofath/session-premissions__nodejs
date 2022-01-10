import { SuperTest, Test } from 'supertest';

export function makePostRequest(
  request: SuperTest<Test>,
  endpoint: string,
  body: Object
) {
  return request
    .post(endpoint)
    .set('Content-Type', 'application/json')
    .send(body);
}

export function makeGetRequest(
  request: SuperTest<Test>,
  endpoint: string,
) {
  return request
    .get(endpoint)
    .set('Content-Type', 'application/json')
    .send();
}

