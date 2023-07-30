/* eslint-disable no-undef */
const assert = require('assert')

Feature('Liking Restaurants')

Before(({ I }) => {
  I.amOnPage('#/favorite')
})

// Scenario('showing empty liked restaurants', ({ I }) => {
//   I.seeElement('#content-favorite')
//   I.see('No favorite restaurant found', '.handling-page')
// })

// Scenario('liking one restaurant', async ({ I }) => {
//   I.see('No favorite restaurant found', '.handling-page')

//   I.amOnPage('')
//   I.seeElement('#content-home #popular #restaurant-item .title')

//   const firstRestaurantButton = locate('#content-home #popular #restaurant-item a').first()
//   const firstRestaurantTitle = await I.grabTextFrom(locate('#content-home #popular #restaurant-item .title').first())
//   I.click(firstRestaurantButton)

//   I.seeElement('#likeButton')
//   I.click('#likeButton')

//   I.amOnPage('#/favorite')
//   I.seeElement('#content-favorite #restaurant-item')
//   const favRestaurantTitle = await I.grabTextFrom('#restaurant-item .title')
//   assert.strictEqual(firstRestaurantTitle, favRestaurantTitle)
// })

Scenario('searching restaurants', async ({ I }) => {
  I.see('No favorite restaurant found', '.handling-page')

  I.amOnPage('')
  I.seeElement('#content-home #popular #restaurant-item .title')

  const titles = []

  for (let i = 1; i <= 3; i++) {
    I.click(locate('#restaurant-item a').at(i))
    I.seeElement('#likeButton')
    I.click('#likeButton')
    titles.push(await I.grabTextFrom('#restaurant-name'))
    I.amOnPage('')
  }

  I.amOnPage('#/favorite')
  I.seeElement('#query')

  const searchQuery = titles[1].substring(1, 5)
  const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1)

  I.fillField('#query', searchQuery)
  I.pressKey('Enter')

  console.log(titles)
  console.log(matchingRestaurants)
  I.seeElement('#fav-restaurants #restaurant-item')
  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('#restaurant-item')
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants)

  // matchingMovies.forEach(async (title, index) => {
  //   const visibleTitle = await I.grabTextFrom(locate('.movie__title').at(index + 1));
  //   assert.strictEqual(title, visibleTitle);
  // });
})
