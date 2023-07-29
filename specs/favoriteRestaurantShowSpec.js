/* eslint-disable */
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view'
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-show-presenter'
// import FavoriteIdb from '../src/scripts/data/favorite.-idb'

describe('Showing all favorite restaurants', () => {
  let view

  const renderTemplate = () => {
    view = new FavoriteRestaurantSearchView()
    document.body.innerHTML = view.getFavoriteRestaurantTemplate()
  }

  beforeEach(() => {
    renderTemplate()
  })

  describe('When no restaurants have been liked', () => {
//     it('should ask for the favorite restaurants', () => {
//       const favoriteRestaurants = spyOnAllFunctions(FavoriteIdb)

//       new FavoriteRestaurantShowPresenter({
//         view,
//         favoriteRestaurants
//       })
//       expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1)
//     })

//     it('should show the information that no restaurants have been liked', (done) => {
//       document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
//         expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1)
//         done()
//       })
     
//       const favoriteRestaurants = spyOnAllFunctions(FavoriteIdb)
//       favoriteRestaurants.getAllRestaurants.and.returnValues([])
     
//       new FavoriteRestaurantShowPresenter({
//         view,
//         favoriteRestaurants
//       })
//     })

    it('should render the information that no restaurants have been liked', () => {
//       const favoriteRestaurants = spyOnAllFunctions(FavoriteIdb)
      const presenter = new FavoriteRestaurantShowPresenter({
        view,
//         favoriteRestaurants
      })
        
      const restaurants = []
      presenter._displayRestaurants(restaurants)
       
      expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1)
    })

//     it('should render the information that no restaurants have been liked', () => {
//       const favoriteRestaurants = spyOnAllFunctions(FavoriteIdb)
//       const presenter = new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants })

//       const restaurants = []
//       presenter._displayRestaurants(restaurants)

//       expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1)
//     })
  })
//   describe('When favorite restaurants exist', () => {
//     it('should show the restaurants', (done) => {
//       document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
//         expect(document.querySelectorAll('.restaurant-item').length).toEqual(2)
//         done()
//       })

//       const favoriteRestaurants = spyOnAllFunctions(FavoriteIdb);
//       favoriteRestaurants.getAllRestaurants.and.returnValues([
//         { id: 11, title: 'Restaurant X' },
//         { id: 22, title: 'ada juga Restaurant Xbcde' },
//       ])

//       new FavoriteRestaurantShowPresenter({
//         view,
//         favoriteRestaurants
//       })
//     })
//   })
})
