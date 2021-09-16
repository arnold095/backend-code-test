Feature: Remove an existing genially
  Scenario: soft delete of the genially is performed
    Given I have this genially:
    """
    {
        "id": "93363592-4b39-4ad4-b68e-a9ffd5198c13",
        "name": "Test",
        "description": "test",
        "createdAt": "2021-09-16 14:06:14.463Z",
        "modifiedAt": "2021-09-16 14:06:14.463Z",
        "deletedAt": null
    }
    """
    When I send a PUT request to "/genially/93363592-4b39-4ad4-b68e-a9ffd5198c13/delete" with body:
    """
    """
    Then the response status code should be 204
    And the response should be empty
