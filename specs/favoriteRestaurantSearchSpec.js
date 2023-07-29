/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter'
import FavoriteIdb from '../src/scripts/data/favorite.-idb'
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view'

describe('Searching restaurants', () => {
  let presenter
  let favoriteRestaurants
  let view

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query')
    queryElement.value = query
    queryElement.dispatchEvent(new Event('change'))
  }

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView()
    document.body.innerHTML = view.getTemplate()
  }

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteIdb)
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view
    })
  }

  beforeEach(() => {
    setRestaurantSearchContainer()
    constructPresenter()
  })

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('Restaurant X')
      expect(presenter.latestQuery).toEqual('Restaurant X')
    })

    it('should ask the model to search for liked restaurants', () => {
      searchRestaurants('Restaurant X')
      expect(FavoriteIdb.searchRestaurants).toHaveBeenCalledWith('Restaurant X')
    })

    it('should show - when the restaurant returned does not contain a title', (done) => {
      document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
        const movieTitles = document.querySelectorAll('.restaurant__title')
        expect(movieTitles.item(0).textContent).toEqual('-')

        done()
      })

      favoriteRestaurants.searchRestaurants.withArgs('Restaurant X').and.returnValues([
        { id: 444 }
      ])

      searchRestaurants('Restaurant X')
    })

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(3)
          done()
        })

      favoriteRestaurants.searchRestaurants.withArgs('Restaurant X')
        .and
        .returnValues([
          { id: 111, title: 'Restaurant Xbc' },
          { id: 222, title: 'ada juga Restaurant Xbcde' },
          { id: 333, title: 'ini juga boleh Restaurant X' }
        ])

      searchRestaurants('Restaurant X')
    })

    it('should show the name of the restaurants found by Favorite restaurants', (done) => {
      document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
        const restaurantTitles = document.querySelectorAll('.restaurant__title')
        expect(restaurantTitles.item(0).textContent).toEqual('Restaurant Xbc')
        expect(restaurantTitles.item(1).textContent).toEqual('ada juga Restaurant Xbcde')
        expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh Restaurant X')
        done()
      })

      favoriteRestaurants.searchRestaurants.withArgs('Restaurant X')
        .and
        .returnValues([
          { id: 111, title: 'Restaurant Xbc' },
          { id: 222, title: 'ada juga Restaurant Xbcde' },
          { id: 333, title: 'ini juga boleh Restaurant X' }
        ])

      searchRestaurants('Restaurant X')
    })
  })

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ')
      expect(presenter.latestQuery?.length).toEqual(0)

      searchRestaurants('     ')
      expect(presenter.latestQuery?.length).toEqual(0)

      searchRestaurants('\t')
      expect(presenter.latestQuery?.length).toEqual(0)
    })

    it('should ask the model to search for restaurants', () => {
      searchRestaurants('Restaurant X')

      expect(favoriteRestaurants.searchRestaurants)
        .toHaveBeenCalledWith('Restaurant X')
    })

    it('should show all favorite restaurants', () => {
      searchRestaurants('    ')
      expect(favoriteRestaurants.getAllRestaurants)
        .toHaveBeenCalled()
    })
  })

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurants__not__found')?.length).toEqual(1)
          done()
        })

      favoriteRestaurants.searchRestaurants.withArgs('Restaurant X').and.returnValues([])

      searchRestaurants('Restaurant X')
    })

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
        expect(document.querySelectorAll('.restaurant')?.length).toEqual(0)
        done()
      })

      favoriteRestaurants.searchRestaurants.withArgs('Restaurant X').and.returnValues([])
      searchRestaurants('Restaurant X')
    })
  })
})
