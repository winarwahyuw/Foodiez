import UrlParser from '../../routes/urlParser'
import TheRestaurantDbSource from '../../data/therestaurantdb-source'
import LikeButtonInitiator from '../../utils/like-button-initiator'
import API_ENDPOINT from '../../globals/api-endpoint'
import { createRestaurantDetail } from '../templates/template-creator'
// import API_ENDPOINT from '../../globals/api-endpoint'
// import CONFIG from '../../globals/config'

const Detail = {
  async render () {
    return `
    <div class="jumbotron" id="jumbotron-detail">
      <div class="overlay">
        <h1 class="title" id="restaurant-name"></h1>
        <p class="sub-title">Find the delicious food to make your day!</p>
      </div>
    </div>

    <div class="container">
      <div class="card" id="detail-resto"></div>
      <div id="likeButtonContainer"></div>
    </div>
    `
  },
  async afterRender () {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id)

    const jumbotron = document.getElementById('jumbotron-detail')
    const restaurantName = document.getElementById('restaurant-name')
    const container = document.querySelector('#detail-resto')

    jumbotron.style.backgroundImage = `url(${API_ENDPOINT.IMAGE_LARGE(restaurant.pictureId)})`
    restaurantName.append(restaurant.name)
    container.innerHTML = createRestaurantDetail(restaurant)

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        city: restaurant.city,
        address: restaurant.address,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        categories: restaurant.categories,
        menus: restaurant.menus,
        customerReviews: restaurant.customerReviews
      }
    })
  }
}
export default Detail
