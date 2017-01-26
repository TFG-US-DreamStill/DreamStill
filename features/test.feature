Feature: Go to homepage
  In order to go to homepage
  As a visitor
  I want to be able to view the homepage

  Scenario: Seeing homepage
    Given I am on the homepage
    Then register to the Login Page as "test"
    Then the title should equal "DreamStill"