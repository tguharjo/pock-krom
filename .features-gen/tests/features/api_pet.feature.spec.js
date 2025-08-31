// Generated from: tests/features/api_pet.feature
import { test } from "playwright-bdd";

test.describe('Pet API', () => {

  test('User can perform CRUD operations on Pet API', { tag: ['@pet_api', '@pet_api_crud', '@p0'] }, async ({ Given, When, Then, And, request }) => { 
    await Given('I have a pet payload'); 
    await When('I send a POST request to pet endpoint', null, { request }); 
    await Then('the response status should be 200'); 
    await And('the response should contain the pet data'); 
    await And('I save the "id" from the response as "petId"'); 
    await When('I send a GET request to pet endpoint with id', null, { request }); 
    await Then('the response status should be 200'); 
    await And('the response should contain the pet data'); 
    await And('I have an updated pet payload'); 
    await When('I send a PUT request to pet endpoint', null, { request }); 
    await Then('the response status should be 200'); 
    await And('the response should contain the updated pet data'); 
    await When('I send a DELETE request to pet endpoint with id', null, { request }); 
    await Then('the response status should be 200'); 
    await And('the pet should no longer exist', null, { request }); 
  });

  test.describe('User can find pets by status', () => {

    test('Example #1', { tag: ['@pet_api', '@find_by_status', '@p1'] }, async ({ When, Then, And, request }) => { 
      await When('I send a GET request to find pets by status "pending"', null, { request }); 
      await Then('the response status should be 200'); 
      await And('the response should contain pets with status "pending"'); 
    });

    test('Example #2', { tag: ['@pet_api', '@find_by_status', '@p1'] }, async ({ When, Then, And, request }) => { 
      await When('I send a GET request to find pets by status "sold"', null, { request }); 
      await Then('the response status should be 200'); 
      await And('the response should contain pets with status "sold"'); 
    });

    test('Example #3', { tag: ['@pet_api', '@find_by_status', '@p1'] }, async ({ When, Then, And, request }) => { 
      await When('I send a GET request to find pets by status "available"', null, { request }); 
      await Then('the response status should be 200'); 
      await And('the response should contain pets with status "available"'); 
    });

  });

  test('User should not be able to add a pet with an invalid status value', { tag: ['@pet_api', '@negative_scenario', '@p1'] }, async ({ Given, When, Then, And, request }) => { 
    await Given('I have a pet payload with invalid status "invalid_status"'); 
    await When('I send a POST request to pet endpoint', null, { request }); 
    await Then('the response status should be 200'); 
    await And('the response should contain the pet data with invalid status'); 
  });

  test('User should not be able to update pet with form using non-existent pet ID', { tag: ['@pet_api', '@negative_scenario', '@p1'] }, async ({ When, Then, And, request }) => { 
    await When('I send a POST request to update pet with form using non-existent ID "999999"', null, { request }); 
    await Then('the response status should be 404'); 
    await And('the response should contain an error message about not found'); 
  });

  test('User should not be able to update pet with form using invalid pet ID', { tag: ['@pet_api', '@negative_scenario', '@p1'] }, async ({ When, Then, And, request }) => { 
    await When('I send a POST request to update pet with form using invalid ID "invalid_id"', null, { request }); 
    await Then('the response status should be 404'); 
    await And('the response should contain an error message about not found'); 
  });

  test('User should not be able to update pet with form using empty required fields', { tag: ['@pet_api', '@negative_scenario', '@p1'] }, async ({ Given, When, Then, And, request }) => { 
    await Given('I have a valid pet', null, { request }); 
    await When('I send a POST request to update pet with form using empty name and status', null, { request }); 
    await Then('the response status should be 200'); 
    await And('the response should contain the updated pet data with empty fields'); 
  });

  test('User should not be able to update pet with form using invalid status value', { tag: ['@pet_api', '@negative_scenario', '@p1'] }, async ({ Given, When, Then, And, request }) => { 
    await Given('I have a valid pet', null, { request }); 
    await When('I send a POST request to update pet with form using invalid status "invalid_status"', null, { request }); 
    await Then('the response status should be 200'); 
    await And('the response should contain the updated pet data with invalid status'); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/api_pet.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":18,"tags":["@pet_api","@pet_api_crud","@p0"],"steps":[{"pwStepLine":7,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given I have a pet payload","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When I send a POST request to pet endpoint","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then the response status should be 200","stepMatchArguments":[{"group":{"start":30,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":10,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And the response should contain the pet data","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And I save the \"id\" from the response as \"petId\"","stepMatchArguments":[{"group":{"start":12,"value":"id","children":[]}},{"group":{"start":38,"value":"petId","children":[]}}]},{"pwStepLine":12,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When I send a GET request to pet endpoint with id","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then the response status should be 200","stepMatchArguments":[{"group":{"start":30,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":14,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And the response should contain the pet data","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And I have an updated pet payload","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When I send a PUT request to pet endpoint","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then the response status should be 200","stepMatchArguments":[{"group":{"start":30,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":18,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And the response should contain the updated pet data","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When I send a DELETE request to pet endpoint with id","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then the response status should be 200","stepMatchArguments":[{"group":{"start":30,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":21,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And the pet should no longer exist","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":48,"tags":["@pet_api","@find_by_status","@p1"],"steps":[{"pwStepLine":27,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When I send a GET request to find pets by status \"pending\"","stepMatchArguments":[{"group":{"start":45,"value":"pending","children":[]}}]},{"pwStepLine":28,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then the response status should be 200","stepMatchArguments":[{"group":{"start":30,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":29,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And the response should contain pets with status \"pending\"","stepMatchArguments":[{"group":{"start":46,"value":"pending","children":[]}}]}]},
  {"pwTestLine":32,"pickleLine":49,"tags":["@pet_api","@find_by_status","@p1"],"steps":[{"pwStepLine":33,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When I send a GET request to find pets by status \"sold\"","stepMatchArguments":[{"group":{"start":45,"value":"sold","children":[]}}]},{"pwStepLine":34,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then the response status should be 200","stepMatchArguments":[{"group":{"start":30,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":35,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And the response should contain pets with status \"sold\"","stepMatchArguments":[{"group":{"start":46,"value":"sold","children":[]}}]}]},
  {"pwTestLine":38,"pickleLine":50,"tags":["@pet_api","@find_by_status","@p1"],"steps":[{"pwStepLine":39,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When I send a GET request to find pets by status \"available\"","stepMatchArguments":[{"group":{"start":45,"value":"available","children":[]}}]},{"pwStepLine":40,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then the response status should be 200","stepMatchArguments":[{"group":{"start":30,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":41,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And the response should contain pets with status \"available\"","stepMatchArguments":[{"group":{"start":46,"value":"available","children":[]}}]}]},
  {"pwTestLine":46,"pickleLine":53,"tags":["@pet_api","@negative_scenario","@p1"],"steps":[{"pwStepLine":47,"gherkinStepLine":54,"keywordType":"Context","textWithKeyword":"Given I have a pet payload with invalid status \"invalid_status\"","stepMatchArguments":[{"group":{"start":42,"value":"invalid_status","children":[]}}]},{"pwStepLine":48,"gherkinStepLine":55,"keywordType":"Action","textWithKeyword":"When I send a POST request to pet endpoint","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"Then the response status should be 200","stepMatchArguments":[{"group":{"start":30,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":50,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"And the response should contain the pet data with invalid status","stepMatchArguments":[]}]},
  {"pwTestLine":53,"pickleLine":60,"tags":["@pet_api","@negative_scenario","@p1"],"steps":[{"pwStepLine":54,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When I send a POST request to update pet with form using non-existent ID \"999999\"","stepMatchArguments":[{"group":{"start":69,"value":"999999","children":[]}}]},{"pwStepLine":55,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"Then the response status should be 404","stepMatchArguments":[{"group":{"start":30,"value":"404","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":56,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"And the response should contain an error message about not found","stepMatchArguments":[]}]},
  {"pwTestLine":59,"pickleLine":66,"tags":["@pet_api","@negative_scenario","@p1"],"steps":[{"pwStepLine":60,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"When I send a POST request to update pet with form using invalid ID \"invalid_id\"","stepMatchArguments":[{"group":{"start":64,"value":"invalid_id","children":[]}}]},{"pwStepLine":61,"gherkinStepLine":68,"keywordType":"Outcome","textWithKeyword":"Then the response status should be 404","stepMatchArguments":[{"group":{"start":30,"value":"404","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":62,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"And the response should contain an error message about not found","stepMatchArguments":[]}]},
  {"pwTestLine":65,"pickleLine":72,"tags":["@pet_api","@negative_scenario","@p1"],"steps":[{"pwStepLine":66,"gherkinStepLine":73,"keywordType":"Context","textWithKeyword":"Given I have a valid pet","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":74,"keywordType":"Action","textWithKeyword":"When I send a POST request to update pet with form using empty name and status","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":75,"keywordType":"Outcome","textWithKeyword":"Then the response status should be 200","stepMatchArguments":[{"group":{"start":30,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":69,"gherkinStepLine":76,"keywordType":"Outcome","textWithKeyword":"And the response should contain the updated pet data with empty fields","stepMatchArguments":[]}]},
  {"pwTestLine":72,"pickleLine":79,"tags":["@pet_api","@negative_scenario","@p1"],"steps":[{"pwStepLine":73,"gherkinStepLine":80,"keywordType":"Context","textWithKeyword":"Given I have a valid pet","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":81,"keywordType":"Action","textWithKeyword":"When I send a POST request to update pet with form using invalid status \"invalid_status\"","stepMatchArguments":[{"group":{"start":68,"value":"invalid_status","children":[]}}]},{"pwStepLine":75,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"Then the response status should be 200","stepMatchArguments":[{"group":{"start":30,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":76,"gherkinStepLine":83,"keywordType":"Outcome","textWithKeyword":"And the response should contain the updated pet data with invalid status","stepMatchArguments":[]}]},
]; // bdd-data-end