import API_ENDPOINT from '../../globals/api-endpoint'
const createRestaurantItem = (restaurant) => `
  <div class="card d-flex-col">
    <img class="card-img" src="${API_ENDPOINT.IMAGE_SMALL(restaurant.pictureId)}" alt="Gambar Restoran">
    <div class="card-body">
        <p class="title">${restaurant.name}</p>
        <p>${restaurant.city}</p>
        <p><i class="fa fa-star icon-secondary"></i> ${restaurant.rating}</p>
    </div>
    <div class="card-footer d-flex-row">
        <a class="btn btn-secondary" href="#/detail/${restaurant.id}">Check this Out</a>
    </div>
  </div>
`
const createRestaurantDetail = (restaurant) => `
    <div class='detail-header'>
        <h3 class="my-2">Information</h3>
        <p>Rating ${restaurant.rating} <i class="fa fa-star icon-secondary"></i></p>
        <p>${restaurant.address}</p>
        <p>${restaurant.city}</p>
        <p class="my-2">Categories : ${restaurant.categories.map((category) => ` ${category.name}`)}</span></p>
        <p class="my-2">${restaurant.description}</p>
    </div>
    <div class="detail-content">
        <h3 class="my-2">Our Menus</h3>
        <div class="" id="list-menus">
          <div class="detail-menus">
            <p>Foods</p>        
            <ul class="foods">${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')} </ul>
          </div>
          <div class="detail-menus">
            <p>Drinks</p>
            <ul class="foods">${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')} </ul>
          </div>
        </div>
    </div>
`

const createReviews = (review) => `
  <div class="review-item">
    <p><b>${review.name}</b></p>
    <p>${review.date}</p>
    <p>${review.review}</p>
  </div>
`

const createAlert = (type, msg) => `
  <span class='alert-${type} my-2'>${msg}</span>
`

const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`

const createHandlingPage = (title, message) => `
  <div class="handling-page">
    <span class="handling-icon"><i class="fa fa-frown-o" aria-hidden="true"></i></span>
    <div class="handling-page-content">
      <h3 class="title my-2">${title}</h3>
      <p class="message">${message}</p>
    </div>
    <div class="handling-page-footer">
      <a class="btn btn-secondary" href="/">Back to Home</a>
    </div>
  </div>
`

export {
  createRestaurantItem,
  createRestaurantDetail,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createReviews,
  createAlert,
  createHandlingPage
}
