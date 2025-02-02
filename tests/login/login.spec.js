// @ts-check
import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pageObjects/login.po';
const testData = require('../../fixtures/loginFixtures.json');

test.beforeEach(async ({page}) => {
  await page.goto('/');
})

test.describe('valid login tests', () => {
  test('Login using valid username and password', async ({page}) => {
    const login = new LoginPage(page);
    await login.login(testData.validUSer.userName, testData.validUSer.password);
    await login.verifyValidLogin();
  })
})

test.describe('inValid login tests', () => {
  test('Login using inValid username and password', async ({page}) => {
    const login = new LoginPage(page);
    await login.login(testData.inValidUSer.userName, testData.inValidUSer.password);
    await login.verifyInValidLogin();
  })
})

test.describe('Valid unername and Invalid password', () => {
  test('Login using inValid username and password', async ({page}) => {
    const login = new LoginPage(page);
    await login.login(testData.validUSer.userName, testData.inValidUSer.password);
    await login.verifyInValidLogin();
  })
})

test.describe('InValid unername and valid password', () => {
  test('Login using inValid username and password', async ({page}) => {
    const login = new LoginPage(page);
    await login.login(testData.inValidUSer.userName, testData.validUSer.password);
    await login.verifyInValidLogin();
  })

  test('Login using empty username and password', async ({page}) => {
    const login = new LoginPage(page);
    await login.login("", "");
    await login.verifyInValidLogin();
  })
  
})

