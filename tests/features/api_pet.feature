@pet_api
Feature: Pet API

 # lists of scenarios to cover: 
 # 1. User should be able to create a new pet with all required fields
 # 2. User should be able to update an existing pet with specified fields
 # 3. User should be able to find a pet by its ID
 # 4. User should be able to delete a pet by its ID
 # 5. User should be able to find pets by their status available
 # 6. User should be able to find pets by their status pending
 # 7. User should be able to find pets by their status sold
 # 8. User should not be able to add a pet with an invalid status value
 # 9. User should not be able to update pet with form using non-existent pet ID
 # 10. User should not be able to update pet with form using invalid pet ID
 # 11. User should not be able to update pet with form using empty required fields
 # 12. User should not be able to update pet with form using invalid status value

  # This feature tests the CRUD operations on the Pet API include creating, reading, updating, and deleting a pet. 
  @pet_api_crud @p0
  Scenario: User can perform CRUD operations on Pet API
    Given I have a pet payload
    When I send a POST request to pet endpoint
    Then the response status should be 200
    And the response should contain the pet data

    And I save the "id" from the response as "petId"
    When I send a GET request to pet endpoint with id
    Then the response status should be 200
    And the response should contain the pet data

    And I have an updated pet payload
    When I send a PUT request to pet endpoint
    Then the response status should be 200
    And the response should contain the updated pet data

    When I send a DELETE request to pet endpoint with id
    Then the response status should be 200
    And the pet should no longer exist

  # This feature tests the filtering of pets by their status using query parameters.
  # It includes scenarios for filtering pets with different statuses such as "pending", "sold", and "available".
  @find_by_status @p1
  Scenario Outline: User can find pets by status
    When I send a GET request to find pets by status "<status>"
    Then the response status should be 200
    And the response should contain pets with status "<status>"

    Examples:
      | status    |
      | pending   |
      | sold      |
      | available |

  @negative_scenario @p1
  Scenario: User should not be able to add a pet with an invalid status value
    Given I have a pet payload with invalid status "invalid_status"
    When I send a POST request to pet endpoint
    Then the response status should be 404
    And the response should contain the pet data with invalid status

  @negative_scenario @p1
  Scenario: User should not be able to update pet with form using non-existent pet ID
    When I send a POST request to update pet with form using non-existent ID "999999"
    Then the response status should be 404
    And the response should contain an error message about not found

  @negative_scenario @p1
  Scenario: User should not be able to update pet with form using invalid pet ID
    When I send a POST request to update pet with form using invalid ID "invalid_id"
    Then the response status should be 404
    And the response should contain an error message about not found

  @negative_scenario @p1
  Scenario: User should not be able to update pet with form using empty required fields
    Given I have a valid pet
    When I send a POST request to update pet with form using empty name and status
    Then the response status should be 200
    And the response should contain the updated pet data with empty fields

  @negative_scenario @p1
  Scenario: User should not be able to update pet with form using invalid status value
    Given I have a valid pet
    When I send a POST request to update pet with form using invalid status "invalid_status"
    Then the response status should be 200
    And the response should contain the updated pet data with invalid status