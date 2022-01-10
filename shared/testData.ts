export const demoUser = {
  username: 'demo',
  password: '123456',
};

// should be tested after demo user is saved with same name
export const userExist = {
  username: 'demo',
  password: '123456',
};

// bad request no password
export const userInvalidParam = {
  username: 'demo',
};

// invalid password
export const userInvalidCred = {
  username: 'demo',
  password: '666666',
};
