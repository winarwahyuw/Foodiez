/* eslint-disable no-undef */
import { itActsAsFavoriteRestaurantModel } from './favoriteRestaurantContract'
import FavoriteIdb from '../src/scripts/data/favorite.-idb'

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteIdb.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteIdb.deleteRestaurant(restaurant.id)
    })
  })

  itActsAsFavoriteRestaurantModel(FavoriteIdb)
})
