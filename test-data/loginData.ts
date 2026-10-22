interface LoginScenario {
  testId: string;
  scenario: string;
  username: string;
  password: string;
}

export const loginData = {
  validUser: 'standard_user',
  lockedUser: 'locked_out_user',
  invalidUser: 'invalid_user',

  validPassword: 'secret_sauce',
  invalidPassword: 'wrong_password',
};

export const negativeLoginScenarios: LoginScenario[] = [
  {
    testId: 'LOGIN-002',
    scenario: 'invalid username',
    username: loginData.invalidUser,
    password: loginData.validPassword,
  },
  {
    testId: 'LOGIN-003',
    scenario: 'invalid password',
    username: loginData.validUser,
    password: loginData.invalidPassword,
  },
  {
    testId: 'LOGIN-004',
    scenario: 'locked-out user',
    username: loginData.lockedUser,
    password: loginData.validPassword,
  },
];
