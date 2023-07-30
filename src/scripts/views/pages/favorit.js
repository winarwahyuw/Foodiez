import FavoriteIdb from '../../data/favorite.-idb'
import { createRestaurantItem, createHandlingPage } from '../templates/template-creator'
import TheRestaurantDbSource from '../../data/therestaurantdb-source'

const Favorite = {
  async render () {
    return `
      <div class="jumbotron" id="jumbotron-favorite">
        <div class="overlay">
          <h1 class="title">Favorite Restaurants</h1>
          <div class="form">
            <input type="text" placeholder="Restaurant name.." name="query" id="query" value="" class="form-input">
            <button id="search-restaurant" type="button" aria-label="Search Button" class="btn-outline-primary">SEARCH</button>
          </div>
        </div>
      </div>

      <div class="container content-favorite" id="content-favorite">
        <div id="fav-restaurants" class="favorite">
        </div>
      </div>

      <div class="container hide" id="search-results-container">
        <div id="search-not-found"></div>
      </div>
    `
  },

  async afterRender () {
    const favContainer = document.querySelector('#fav-restaurants')
    const skipLink = document.getElementById('skip-link')
    const content = document.querySelector('#content-favorite')
    const searchResultContainer = document.getElementById('search-results-container')
    const searchButton = document.getElementById('search-restaurant')
    const query = document.getElementById('query')
    const searchNotFound = document.getElementById('search-not-found')

    const restaurants = await FavoriteIdb.getAllRestaurants()
    restaurants.length > 0 ? restaurants.forEach((resto) => { favContainer.innerHTML += createRestaurantItem(resto) }) : content.innerHTML = createHandlingPage('OOPSS...', 'No favorite restaurant found')

    skipLink.addEventListener('click', (e) => {
      e.preventDefault()
      content.scrollIntoView({ behavior: 'smooth' })
      skipLink.blur()
    })

    searchButton.addEventListener('click', async (e) => {
      e.preventDefault()
      onSearch()
    })

    query.addEventListener('keypress', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onSearch()
      }
    })

    const onSearch = async () => {
      const searchKey = query.value
      const searchResults = await TheRestaurantDbSource.searchRestaurant(searchKey)

      const searchFavRestaurant = searchResults.filter(searchResult => restaurants.some(restaurant => searchResult.id === restaurant.id))

      favContainer.innerHTML = ''
      if (searchFavRestaurant?.length > 0) {
        content.classList.remove('hide')
        searchResultContainer.classList.toggle('hide')
        searchFavRestaurant.forEach((resto) => { favContainer.innerHTML += createRestaurantItem(resto) })
      } else {
        searchResultContainer.classList.remove('hide')
        content.classList.toggle('hide')
        searchNotFound.innerHTML = createHandlingPage('SORRY...', 'The restaurant you were looking is not found')
      }
    }
  }
}

export default Favorite
