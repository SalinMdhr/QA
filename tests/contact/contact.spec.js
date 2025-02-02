import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pageObjects/login.po";
import { ContactPage } from "../../pageObjects/contact.po";
import { authenticate, accessToken, createEntity } from "../utils/helper.spec";
import { request } from "http";
const testData = require("../../fixtures/loginFixtures.json");
const testContact = require("../../fixtures/addContactFixtures.json");

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await page.goto("/");
  await login.login(testData.validUSer.userName, testData.validUSer.password);
  await login.verifyValidLogin();
});

// test.describe("successful contact creation", () => {
//   test("Create contact test", async ({ page }) => {
//     const contact = new ContactPage(page);
//     await contactAdd(testContact.validAddition, contact);
//     await validateAndViewContact(testContact.validAddition, contact);
//   });
// });

// test.describe("failed contact creation", () => {
//   test("Create Empty contact test", async ({ page }) => {
//     const contact = new ContactPage(page);
//     await contactAdd(testContact.emptyAddition, contact);
//   });
// });

test.describe("contact Update", () => {
  test("Update contact test", async ({ page }) => {
    const contact = new ContactPage(page);
    let accessToken = await authenticate(
      testData.validUSer.userName,
      testData.validUSer.password,
      { page } , {request}
    );
    await createEntity(testContact.updateContact, accessToken, "/contacts", {
      request,
    });
    page.reload();
    await validateAndViewContact(testContact.validAddition, contact);
    

  });
});



//functions
async function contactAdd(test, contact) {
  await contact.addContacts(
    test.FirstName,
    test.LastName,
    test.DOB,
    test.Email,
    test.Phone,
    test.streetAddr1,
    test.streetAddr2,
    test.City,
    test.State,
    test.PostalCode,
    test.Country
  );
}

async function validateAndViewContact(test, contact) {
  await contact.verifyAndShowContact(
    test.FirstName,
    test.LastName,
    test.DOB,
    test.Email,
    test.Phone,
    test.streetAddr1,
    test.streetAddr2,
    test.City,
    test.State,
    test.PostalCode,
    test.Country
  );
}
