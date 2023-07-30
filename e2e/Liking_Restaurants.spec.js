/* eslint-disable no-undef */
const assert = require('assert')

Feature('Liking Restaurants')

Before(({ I }) => {
  I.amOnPage('#/favorite')
})

Scenario('showing empty liked restaurants', async ({ I }) => {
  I.see('No favorite restaurant found', '.handling-page')

  I.amOnPage('')
  I.seeElement('#content-home #popular #restaurant-item .title')

  const firstRestaurantButton = locate('#content-home #popular #restaurant-item a').first()
  const firstRestaurantTitle = await I.grabTextFrom(locate('#content-home #popular #restaurant-item .title').first())
  I.click(firstRestaurantButton)

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('#/favorite')
  I.seeElement('#content-favorite #restaurant-item')

  const favRestaurantTitle = await I.grabTextFrom('#content-favorite #restaurant-item .title')
  assert.strictEqual(firstRestaurantTitle, favRestaurantTitle)
})
