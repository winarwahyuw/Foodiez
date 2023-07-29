/* eslint-disable no-undef */

Feature('Liking Restaurants')

Before(({ I }) => {
  I.amOnPage('/#/favorite')
})

Scenario('showing empty liked restaurants', ({ I }) => {
  I.see('No favorite restaurant found', '.handling-page')

  I.amOnPage('/')
})
