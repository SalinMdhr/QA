const axios = require("axios");
import { expect } from "@playwright/test";
import {request} from 'http';
const cookie = require("cookie");

let apiUrl;

module.exports.authenticate = async function authenticate(username, password, {page}, { request }) {
  const apiUrl = await getApiBaseUrl();
  console.log('==================', apiUrl);
  
  const headers = { "Content-Type": "application/json" };
  const requestBody = {
    email: username,
    password: password,
  };
  const response = await page.request.post(`${apiUrl}/users/login`, {
    data: requestBody,
    headers,
  }); 
  expect(response.status()).toBe(200);
  console.log('passsssssss');
  
  const responseBody = await response.json();
  const token = responseBody.token;
  return token;
}

async function getApiBaseUrl() {
  apiUrl = process.env.API_BASE_URL;
  if (!apiUrl) {
    apiUrl = "https://thinking-tester-contact-list.herokuapp.com";
  }
  return apiUrl;
}

module.exports.createEntity =  async function createEntity(userData, accessToken, module, { request }) {
  const apiUrl = await getApiBaseUrl();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: "Bearer " + accessToken,
  };
  const response = await request.post(apiUrl + module, {
    headers,
    data: JSON.stringify(userData),
  });

  const responseBody = await response.json();
  const statusCode = response.status();
  expect(statusCode).toBe(201);
  if (responseBody && responseBody.id) {
    return responseBody.id;
  } else {
    return null;
  }
}
