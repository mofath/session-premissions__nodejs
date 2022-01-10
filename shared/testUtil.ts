import { SuperTest, Test } from 'supertest';

export function makePostRequest(
  request: SuperTest<Test>,
  endpoint: string,
  body: Object,
  token?: string
) {
  const req = request.post(endpoint).set('Content-Type', 'application/json');
  if (token) req.set('Authorization', 'Bearer ' + token);
  return req.send(body);
}

export function makeGetRequest(
  request: SuperTest<Test>,
  endpoint: string,
  token?: string
) {
  const req = request.get(endpoint)
  .set('Content-Type', 'application/json');
  if (token) req.set('Authorization', 'Bearer ' + token);
  return req.send();
}
