const { expect } = require("@playwright/test");

exports.ContactPage = class ContactPage {
  constructor(page) {
    this.page = page;
    this.addContact = '//button[@id="add-contact"]';
    this.firstName = "#firstName";
    this.lastName = "#lastName";
    this.dob = '//input[@placeholder="yyyy-MM-dd"]';
    this.email = '//input[@id="email"]';
    this.phone = '//input[@id="phone"]';
    this.address = '//input[@placeholder="Address 1"]';
    this.address2 = '//input[@placeholder="Address 2"]';
    this.city = '//input[@placeholder="City"]';
    this.state = '//input[@placeholder="State or Province"]';
    this.postal = '//input[@placeholder="Postal Code"]';
    this.country = '//input[@placeholder="Country"]';
    this.Save = '//button[@id="submit"]';

    this.Show = '//tr[@class="contactTableBodyRow"]';
    this.errorId = '//span[@id="error"]';
    this.errorMsg =
      "Contact validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required.";

    this.savedFirstName = '//span[@id="firstName"]';
    this.savedLastName = '//span[@id="lastName"]';
    this.savedDOB = '//span[@id="birthdate"]';
    this.savedEmail = '//span[@id="email"]';
    this.savedPhone = '//span[@id="phone"]';
    this.savedAddress = '//span[@id="street1"]';
    this.savedAddress2 = '//span[@id="street2"]';
    this.savedCity = '//span[@id="city"]';
    this.savedState = '//span[@id="stateProvince"]';
    this.savedPostal = '//span[@id="postalCode"]';
    this.savedCountry = '//span[@id="country"]';
  }

  async addContacts(
    fname,
    lname,
    dob,
    email,
    phone,
    streetAddr1,
    streetAddr2,
    city,
    state,
    postalCode,
    country
  ) {
    await this.page.locator(this.addContact).click();
    await this.page.locator(this.firstName).fill(fname);
    await this.page.locator(this.lastName).fill(lname);
    await this.page.locator(this.dob).fill(dob);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.phone).fill(phone);
    await this.page.locator(this.address).fill(streetAddr1);
    await this.page.locator(this.address2).fill(streetAddr2);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.state).fill(state);
    await this.page.locator(this.postal).fill(postalCode);
    await this.page.locator(this.country).fill(country);
    await this.page.locator(this.Save).click();
  }

  async verifyAndShowContact(
    fname,
    lname,
    dob,
    email,
    phone,
    streetAddr1,
    streetAddr2,
    city,
    state,
    postalCode,
    country
  ) {
    let flag = false;
    await this.page.waitForSelector(this.Show, { state: "visible" });

    const rows = await this.page.locator(this.Show).all();


    for (const row of rows) {

      const rowText = await row.innerText({ timeout: 5000 });

      if (rowText.includes(fname + " " + lname) && rowText.includes(email)) {

        await row.click();

        await expect(this.page.locator(this.savedFirstName)).toHaveText(fname);
        await expect(this.page.locator(this.savedLastName)).toHaveText(lname);
        await expect(this.page.locator(this.savedDOB)).toHaveText(dob);
        await expect(this.page.locator(this.savedEmail)).toHaveText(email);
        await expect(this.page.locator(this.savedPhone)).toHaveText(phone);
        await expect(this.page.locator(this.savedAddress)).toHaveText(
          streetAddr1
        );
        await expect(this.page.locator(this.savedAddress2)).toHaveText(
          streetAddr2
        );
        await expect(this.page.locator(this.savedCity)).toHaveText(city);
        await expect(this.page.locator(this.savedState)).toHaveText(state);
        await expect(this.page.locator(this.savedPostal)).toHaveText(
          postalCode
        );
        await expect(this.page.locator(this.savedCountry)).toHaveText(country);
        flag = true;
      }
      if (flag) {
        break;
      }
    }
    if (!flag) {
      throw new Error("No matching contact row found.");
    }
  }

  async emptyValidation() {
    await expect(this.page.locator(this.errorId)).toHaveText(this.errorMsg);
  }
};
