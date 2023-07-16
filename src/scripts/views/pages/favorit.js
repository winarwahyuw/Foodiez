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

      <div class="container" id="content-favorite">
        <div id="fav-restaurants" class="favorite">
        </div>
      </div>
    `
  },

  async afterRender () {
    const restaurants = await FavoriteIdb.getAllRestaurants()
    const moviesContainer = document.querySelector('#fav-restaurants')
    const skipLink = document.getElementById('skip-link')
    const content = document.querySelector('#content-favorite')

    skipLink.addEventListener('click', (e) => {
      e.preventDefault()
      content.scrollIntoView({ behavior: 'smooth' })
      skipLink.blur()
    })

    restaurants.forEach((resto) => {
      moviesContainer.innerHTML += createRestaurantItem(resto)
    })
  }
}

export default Favorite
