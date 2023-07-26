/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter'
import FavoriteIdb from '../src/scripts/data/favorite.-idb'

describe('Searching restaurants', () => {
  let presenter

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query')
    queryElement.value = query
    queryElement.dispatchEvent(new Event('change'))
  }

  beforeEach(() => {
    document.body.innerHTML = `
        <div id="movie-search-container">
        <input id="query" type="text">
        <div class="movie-result-container">
            <ul class="movies">
            </ul>
        </div>
        </div>
    `

    spyOn(FavoriteIdb, 'searchRestaurants')
    presenter = new FavoriteRestaurantSearchPresenter({ favoriteRestaurants: FavoriteIdb })
  })

  it('should be able to capture the query typed by the user', () => {
    searchRestaurants('Restaurant X')
    expect(presenter.latestQuery).toEqual('Restaurant X')
  })

  it('should ask the model to search for liked restaurants', () => {
    searchRestaurants('Restaurant X')
    expect(FavoriteIdb.searchRestaurants).toHaveBeenCalledWith('Restaurant X')
  })
})
