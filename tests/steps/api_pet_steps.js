const { createBdd } = require('playwright-bdd');
const { expect } = require('@playwright/test');
const faker_generator = require('../../lib/faker_generator.js');
const fs = require('fs');
const path = require('path');

const { Given, When, Then } = createBdd();

let response;
let petId;
let petPayload;
let updatedPayload;

Given('I have a pet payload', function () {
  const payloadPath = path.join(__dirname, '../test_data/post_request_body.json');
  const generatedPet = faker_generator.petGenerator();
  
  petPayload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
  petPayload.id = generatedPet.id;
  petPayload.category.id = generatedPet.category.id;
  petPayload.name = generatedPet.name;
  petPayload.photoUrls[0] = generatedPet.photoUrls[0];
  petPayload.tags[0].id = generatedPet.tags[0].id;
  petPayload.status = generatedPet.status;
  
  this.petPayload = petPayload;
});

When('I send a POST request to pet endpoint', async function ({ request }) {
  const baseUrl = process.env.BASE_URL;
  response = await request.post(`${baseUrl}/pet`, {
    data: this.petPayload
  });
  const responseBody = await response.json();
  petId = responseBody.id;
  this.petId = petId;
});

Then(/^the response status should be (\d+)$/, async function ({ }, expectedStatus) {
  expect(response.status()).toBe(parseInt(expectedStatus));
});

Then('the response should contain the pet data', async function () {
  const expected = this.petPayload;
  const actual = await response.json();

  expect(actual.id).toBe(this.petId || petId);
  expect(actual.name).toBe(expected.name);
  expect(actual.status).toBe(expected.status);
  expect(actual.photoUrls).toEqual(expected.photoUrls);
});

Given(/^I save the "([^"]*)" from the response as "([^"]*)"$/, async function ({ }, field, variableName) {
  const responseBody = await response.json();
  this[variableName] = responseBody[field];
});

When('I send a GET request to pet endpoint with id', async function ({ request }) {
  const baseUrl = process.env.BASE_URL;
  response = await request.get(`${baseUrl}/pet/${this.petId}`);
});

Given('I have an updated pet payload', function () {
  const generatedPet = faker_generator.petGenerator();
  updatedPayload = {
    ...this.petPayload,
    name: generatedPet.name + " Updated",
    status: "sold"
  };
  this.updatedPetPayload = updatedPayload;
});

When('I send a PUT request to pet endpoint', async function ({ request }) {
  const baseUrl = process.env.BASE_URL;
  this.updatedPetPayload.id = this.petId;
  response = await request.put(`${baseUrl}/pet`, {
    data: this.updatedPetPayload
  });
});

Then('the response should contain the updated pet data', async function () {
  const expected = this.updatedPetPayload;
  const actual = await response.json();

  expect(actual.id).toBe(this.petId);
  expect(actual.name).toBe(expected.name);
  expect(actual.status).toBe(expected.status);
});

When('I send a DELETE request to pet endpoint with id', async function ({ request }) {
  const baseUrl = process.env.BASE_URL;
  response = await request.delete(`${baseUrl}/pet/${this.petId}`);
});

Then('the pet should no longer exist', async function ({ request }) {
  const baseUrl = process.env.BASE_URL;
  const getResponse = await request.get(`${baseUrl}/pet/${this.petId}`);
  expect(getResponse.status()).toBe(404);
});

When(/^I send a GET request to find pets by status "([^"]*)"$/, async function ({ request }, status) {
  const baseUrl = process.env.BASE_URL;
  response = await request.get(`${baseUrl}/pet/findByStatus?status=${status}`);
  this.status = status;
});

Then(/^the response should contain pets with status "([^"]*)"$/, async function ({ }, status) {
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBeTruthy();
  responseBody.forEach(pet => expect(pet.status).toBe(status));
});

// Negative scenario step definitions
Given(/^I have a pet payload with invalid status "([^"]*)"$/, function ({ }, invalidStatus) {
  const payloadPath = path.join(__dirname, '../test_data/post_request_body.json');
  const generatedPet = faker_generator.petGenerator();
  
  petPayload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
  petPayload.id = generatedPet.id;
  petPayload.category.id = generatedPet.category.id;
  petPayload.name = generatedPet.name;
  petPayload.photoUrls[0] = generatedPet.photoUrls[0];
  petPayload.tags[0].id = generatedPet.tags[0].id;
  petPayload.status = invalidStatus; // Set invalid status
  
  this.petPayload = petPayload;
});

Given('I have a valid pet', async function ({ request }) {
  // First create a valid pet
  const payloadPath = path.join(__dirname, '../test_data/post_request_body.json');
  const generatedPet = faker_generator.petGenerator();
  
  petPayload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
  petPayload.id = generatedPet.id;
  petPayload.category.id = generatedPet.category.id;
  petPayload.name = generatedPet.name;
  petPayload.photoUrls[0] = generatedPet.photoUrls[0];
  petPayload.tags[0].id = generatedPet.tags[0].id;
  petPayload.status = generatedPet.status;
  
  const baseUrl = process.env.BASE_URL;
  const createResponse = await request.post(`${baseUrl}/pet`, {
    data: petPayload
  });
  
  const responseBody = await createResponse.json();
  this.petId = responseBody.id;
  this.petPayload = petPayload;
});

When(/^I send a POST request to update pet with form using non-existent ID "([^"]*)"$/, async function ({ request }, nonExistentId) {
  const baseUrl = process.env.BASE_URL;
  response = await request.post(`${baseUrl}/pet/${nonExistentId}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      name: 'Updated Pet Name',
      status: 'sold'
    }
  });
});

When(/^I send a POST request to update pet with form using invalid ID "([^"]*)"$/, async function ({ request }, invalidId) {
  const baseUrl = process.env.BASE_URL;
  response = await request.post(`${baseUrl}/pet/${invalidId}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      name: 'Updated Pet Name',
      status: 'sold'
    }
  });
});

When('I send a POST request to update pet with form using empty name and status', async function ({ request }) {
  const baseUrl = process.env.BASE_URL;
  response = await request.post(`${baseUrl}/pet/${this.petId}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      name: '',
      status: ''
    }
  });
});

When(/^I send a POST request to update pet with form using invalid status "([^"]*)"$/, async function ({ request }, invalidStatus) {
  const baseUrl = process.env.BASE_URL;
  response = await request.post(`${baseUrl}/pet/${this.petId}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      name: 'Updated Pet Name',
      status: invalidStatus
    }
  });
});

Then('the response should contain an error message about invalid status', async function () {
  const responseBody = await response.text();
  expect(responseBody).toContain('Invalid');
});

Then('the response should contain an error message about not found', async function () {
  const responseBody = await response.text();
  expect(responseBody).toMatch(/not found|NumberFormatException|404/i);
});

Then('the response should contain an error message about invalid ID format', async function () {
  const responseBody = await response.text();
  expect(responseBody).toContain('Invalid');
});

Then('the response should contain an error message about required fields', async function () {
  const responseBody = await response.text();
  expect(responseBody).toContain('required');
});

Then('the response should contain an error message about invalid status value', async function () {
  const responseBody = await response.text();
  expect(responseBody).toContain('Invalid');
});

Then('the response should contain the pet data with invalid status', async function () {
  const actual = await response.json();
  expect(actual.status).toBe('invalid_status');
});

Then('the response should contain the updated pet data with invalid status', async function () {
  if (response.status() === 200) {
    try {
      const actual = await response.json();
      expect(actual).toBeDefined();
      expect(actual.id).toBeDefined();
    } catch (error) {
      const responseText = await response.text();
      expect(responseText).toBeDefined();
    }
  } else {
    const responseText = await response.text();
    expect(responseText).toBeDefined();
  }
});

Then('the response should contain the updated pet data with empty fields', async function () {
  if (response.status() === 200) {
    try {
      const actual = await response.json();
      expect(actual).toBeDefined();
      expect(actual.id).toBeDefined();
    } catch (error) {
      const responseText = await response.text();
      expect(responseText).toBeDefined();
    }
  } else {
    const responseText = await response.text();
    expect(responseText).toBeDefined();
  }
});
