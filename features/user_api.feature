Feature: User API Testing

  Scenario: Create a user and retrieve it by ID
    When I send a "POST" request to "/users" with body:
      """
      {
        "name": "John Doe",
        "username": "johndoe",
        "email": "john@example.com"
      }
      """
    And I store the value of "id" as "createdUserId"
    When I send a "GET" request to "/users/{createdUserId}"
    Then the response status should be 200
    And the JSON response should have property "username"
    And the JSON response property "name" should be "John Doe"
    And the JSON response property "username" should be "johndoe"
    And the JSON response property "email" should be "john@example.com"
    And the JSON response should match the schema "user_schema"
