Feature: Add a new genially
  Scenario: A valid genially is created
    Given I send a POST request to "/genially" with body:
    """
    {
        "id": "93363592-4b39-4ad4-b68e-a9ffd5198c13",
        "name": "Test",
        "description": "test"
    }
    """
    Then the response status code should be 201
    And the response should be empty
