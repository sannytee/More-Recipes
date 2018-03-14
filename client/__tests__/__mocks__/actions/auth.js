const mockUserData = {
  Response: {
    success: true,
    message: 'Account created',
    username: 'Thywo970'
  },
  UserDetails: {
    password: 'test',
    username: 'tester',
    email: 'tester@gmail.com',
  },
  signupError: {
    error: 'Username already exist'
  },
  SigninResponse: {
    success: true,
    message: 'Token Generated. Signin successful!',
    userId: 1,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoiZXhhbXBsZTIwIiwiaWF0IjoxNTIwOTA5MTEwLCJleHAiOjE1MjA5MjM1MTB9.THljeLAG8ffwRURRbPBNQMriHt7eBSDRqbB78k40dqo'
  },
  SigninSuccessResponse: {
    id: 13,
    username: 'example20',
    iat: 1520909110,
    exp: 1520923510
  },
  SigninError: {
    error: 'User already exist'
  }
};

export default mockUserData;
