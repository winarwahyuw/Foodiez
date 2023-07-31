import UrlParser from '../../routes/urlParser'
import TheRestaurantDbSource from '../../data/therestaurantdb-source'
import LikeButtonPresenter from '../../utils/like-button-presenter'
import API_ENDPOINT from '../../globals/api-endpoint'
import { createAlert, createRestaurantDetail, createReviews, createHandlingPage } from '../templates/template-creator'
import FavoriteIdb from '../../data/favorite.-idb'
// import API_ENDPOINT from '../../globals/api-endpoint'
// import CONFIG from '../../globals/config'

const Detail = {
  async render () {
    return `
    <div class="jumbotron" id="jumbotron-detail">
      <picture>
        <source media="(max-width: 600px)" id="source-hero-img" srcset="">
        <img src="" id="hero-img" alt="Hero Image" class="img hero-img lazyload"/>
      </picture>

      <div class="overlay" id="overlay-detail">
        <div class="overlay-content" id="overlay-detail-content">
          <h1 class="title" id="restaurant-name"></h1>
          <p class="sub-title">Find the delicious food to make your day!</p>
        </div>
      </div>
    </div>

    <div class="container detail" id="content-detail">
      <div class="card detail-resto" id="detail-resto"></div>
      <div class="card my-2" id="reviews">
        <div class="my-2 reviews-form" id="reviews-form">
          <h3 class="title my-3">Have been here? Add review</h3>
          <form action="" id="add-review">
            <p id="alert"></p>
            <input type="text" id="name" name="name" placeholder="your name.." required>
            <textarea name="review" id="review" rows="5" placeholder="say something about this place.." required></textarea>
            <button type="submit" id="btn-add-review" aria-label="Button Review" class="btn btn-secondary">Add Review</button>
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
    const heroImg = document.getElementById('hero-img')
    const sourceHeroImg = document.getElementById('source-hero-img')
    const restaurantName = document.getElementById('restaurant-name')
    const container = document.querySelector('#detail-resto')
    const reviewsContainer = document.querySelector('#reviews')
    const reviewsContent = document.querySelector('#reviews-content')
    const formAddReview = document.getElementById('add-review')
    const alertAddReview = document.getElementById('alert')
    const skipLink = document.getElementById('skip-link')
    const content = document.querySelector('#content-detail')
    const url = UrlParser.parseActiveUrlWithoutCombiner()

    try {
      const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id)
      skipLink.addEventListener('click', (e) => {
        e.preventDefault()
        content.scrollIntoView({ behavior: 'smooth' })
        skipLink.blur()
      })

      heroImg.setAttribute('src', `${API_ENDPOINT.IMAGE_LARGE(restaurant.pictureId)}`)
      sourceHeroImg.setAttribute('srcset', `${API_ENDPOINT.IMAGE_SMALL(restaurant.pictureId)}`)

      restaurantName.append(restaurant.name)
      container.innerHTML = createRestaurantDetail(restaurant)

      restaurant.customerReviews.map((review) => (
        reviewsContent.innerHTML += createReviews(review)
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
          reviewsContent.innerHTML += createReviews(review)
        ))

        formAddReview.reset()
      })

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurants: FavoriteIdb,
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
    } catch (error) {
      reviewsContainer.style.display = 'none'
      content.innerHTML = createHandlingPage('Oopss..', 'Could not reach the page because you are offline!')
    }
  }
}
export default Detail
