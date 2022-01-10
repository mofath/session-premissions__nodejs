import { makePostRequest } from './testUtil';
import { demoUser } from './testData';

export async function registerUser(request, user) {
  await makePostRequest(request, '/api/v1/auth/register', user);
}

export async function getAuthUser(request, userCred) {
  // create user
  await registerUser(request, userCred);

  // get user info and token
  const loginRes: any = await makePostRequest(
    request,
    '/api/v1/auth/login',
    demoUser
  );

  return {
    data: loginRes.body,
    status: loginRes.status,
  };
}
