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
// untuk kebutuhan testing
const createExampleItem = (restaurant) => `
<div class="restaurant-item">
    <div class="restaurant-item__header">
      <img class="restaurant-item__header__poster" alt="${restaurant.title || '-'}"
           src='https://picsum.photos/id/666/800/450?grayscale'>
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.vote_average || '-'}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant__title"><a href="/#/detail/${restaurant.id}">${restaurant.title || '-'}</a></h3>
      <p>${restaurant.overview || '-'}</p>
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

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
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
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createReviews,
  createAlert,
  createHandlingPage,
  createExampleItem
}
