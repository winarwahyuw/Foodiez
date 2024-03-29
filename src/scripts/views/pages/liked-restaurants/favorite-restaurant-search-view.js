import { createRestaurantItem } from '../../templates/template-creator'
class FavoriteRestaurantSearchView {
  getTemplate () {
    return `
    <div class="content">
      <input id="query" type="text">
      <h2 class="content__heading">Your Liked restaurant</h2>
        <div id="restaurants" class="restaurants">
        </div>
    </div>
    `
  }

  runWhenUserIsSearching (callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value)
    })
  }

  showFavoriteRestaurants (restaurants = []) {
    let html
    if (restaurants?.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItem(restaurant)), '')
    } else {
      html = this._getEmptyRestaurantTemplate()
    }

    document.getElementById('restaurants').innerHTML = html

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'))
  }

  _getEmptyRestaurantTemplate () {
    return '<div class="restaurant-item__not__found">Tidak ada restaurant untuk ditampilkan</div>'
  }
}

export default FavoriteRestaurantSearchView
