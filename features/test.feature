Feature: Go to homepage
  In order to go to homepage
  As a logged user
  I want to be able to view the homepage

  Scenario: Seeing homepage
    Given I am on the homepage
    Then login to the Login Page as "test"
    Then the title should equal "DreamStill"
    Then I logout

Feature: Check calendar events
  In order to check calendar events
  As a logged user
  I want to be able to view the events of current month

  Scenario: Seeing calendar events
    Given I am on the loginpage
    Then login to the Login Page that time as "juanra"
    Then there are must be "7" events on current month