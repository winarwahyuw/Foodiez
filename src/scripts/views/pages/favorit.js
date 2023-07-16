import FavoriteIdb from '../../data/favorite.-idb'
import { createRestaurantItem } from '../templates/template-creator'

const Favorite = {
  async render () {
    return `
      <div class="jumbotron" id="jumbotron-favorite">
        <div class="overlay">
          <h1 class="title">Favorite Restaurants</h1>
        </div>
      </div>

      <div class="container">
        <div id="fav-restaurants" class="favorite">
        </div>
      </div>
    `
  },

  async afterRender () {
    const restaurants = await FavoriteIdb.getAllRestaurants()
    console.log(restaurants)
    const moviesContainer = document.querySelector('#fav-restaurants')

    restaurants.forEach((resto) => {
      moviesContainer.innerHTML += createRestaurantItem(resto)
    })
  }
}

export default Favorite
