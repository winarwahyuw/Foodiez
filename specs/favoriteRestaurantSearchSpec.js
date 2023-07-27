/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter'
import FavoriteIdb from '../src/scripts/data/favorite.-idb'

describe('Searching restaurants', () => {
  let presenter
  let favoriteRestaurants

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query')
    queryElement.value = query
    queryElement.dispatchEvent(new Event('change'))
  }

  const setRestaurantSearchContainer = () => {
    document.body.innerHTML = `
      <div id="restaurant-search-container">
        <input id="query" type="text">
        <div class="restaurant-result-container">
            <ul class="restaurants">
              <li class="restaurant">
                <span class="restaurant__title">Restaurant Satu</span>
              </li>
              <li class="restaurant">
                <span class="restaurant__title">Restaurant Dua</span>
              </li>
            </ul>
        </div>
      </div>
    `
  }

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteIdb)
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants
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

    it('should show the found retaurants', () => {
      presenter._showFoundRestaurants([{ id: 1 }])
      const foundRestaurants = document.querySelectorAll('.restaurant')
      expect(foundRestaurants.length).toEqual(1)
    })

    it('should show the title of the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1, title: 'Satu' }])
      expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('Satu')
      presenter._showFoundRestaurants([{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }])

      const restaurantTitles = document.querySelectorAll('.restaurant__title')
      expect(restaurantTitles.item(0).textContent).toEqual('Satu')
      expect(restaurantTitles.item(1).textContent).toEqual('Dua')
    })

    it('should show - for found restaurant without title', () => {
      presenter._showFoundRestaurants([{ id: 1 }])
      expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('-')
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