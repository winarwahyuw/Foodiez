import UrlParser from '../../routes/urlParser'
import TheRestaurantDbSource from '../../data/therestaurantdb-source'
import LikeButtonInitiator from '../../utils/like-button-initiator'
import API_ENDPOINT from '../../globals/api-endpoint'
import { createAlert, createRestaurantDetail, createReviews } from '../templates/template-creator'
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

    <div class="container detail">
      <div class="card detail-resto" id="detail-resto"></div>
      <div class="card my-2" id="reviews">
        <div class="my-2 reviews-form" id="reviews-form">
          <h3 class="title my-3">Have been here? Add review</h3>
          <form action="" id="add-review">
            <p id="alert"></p>
            <input type="text" id="name" placeholder="your name.." required>
            <textarea name="review" id="review" rows="5" placeholder="say something about this place.." required></textarea>
            <button type="submit" id="btn-add-review" class="btn btn-secondary">Add Review</button>
          </form>
        </div>
        <div class="my-2 reviews-content" id="reviews-content">
          <h3 class="title my-3">What they say?</h3>
        </div>
      </div>
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
    const reviewsContainer = document.querySelector('#reviews-content')
    const formAddReview = document.getElementById('add-review')
    const alertAddReview = document.getElementById('alert')

    jumbotron.style.backgroundImage = `url(${API_ENDPOINT.IMAGE_LARGE(restaurant.pictureId)})`
    restaurantName.append(restaurant.name)
    container.innerHTML = createRestaurantDetail(restaurant)

    restaurant.customerReviews.map((review) => (
      reviewsContainer.innerHTML += createReviews(review)
    ))

    formAddReview.addEventListener('submit', async (e) => {
      e.preventDefault()

      const id = restaurant.id
      const name = document.getElementById('name').value
      const review = document.getElementById('review').value

      const result = await TheRestaurantDbSource.putRestaurantReview({ id, name, review })
      result.error ? alertAddReview.innerHTML = createAlert('danger', result.message) : alertAddReview.innerHTML = createAlert('success', `Add review ${result.message}`)

      setTimeout(() => {
        alertAddReview.style.display = 'none'
      }, 2000)

      result?.customerReviews?.map((review) => (
        reviewsContainer.innerHTML += createReviews(review)
      ))

      formAddReview.reset()
    })

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
