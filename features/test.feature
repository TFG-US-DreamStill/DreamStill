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
    Then there are must be the correct number of events on current month

Feature: Check calendar actions
  In order to check calendar actions
  As a logged user
  I want to be able to change the months views of the calendar

  Scenario: Seeing calendar actions
    Given I am on the calendar page login as "juanra"
    Then click to the calendar button "Previous" two times 
    And we must be on the view of two months before
    Then click to the calendar button "Next" one time 
    And we must be on the view of one month before
    Then click to the calendar button "Today" one time 
    And we must be on the view of the current month