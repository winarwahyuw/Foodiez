import FavoriteIdb from '../data/favorite.-idb'
import { createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate } from '../views/templates/template-creator'

const LikeButtonPresenter = {
  async init ({ likeButtonContainer, favoriteRestaurant = FavoriteIdb, restaurant }) {
    this._likeButtonContainer = likeButtonContainer
    this._favoriteRestaurants = FavoriteIdb
    this._restaurant = restaurant

    await this._renderButton()
  },

  async _renderButton () {
    const { id } = this._restaurant

    if (await this._isRestaurantExist(id)) {
      this._renderLiked()
    } else {
      this._renderLike()
    }
  },

  async _isRestaurantExist (id) {
    console.log(this._favoriteRestaurants)
    const restaurant = await this._favoriteRestaurants.getRestaurant(id)
    return !!restaurant
  },

  _renderLike () {
    this._likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate()

    const likeButton = document.querySelector('#likeButton')
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.putRestaurant(this._restaurant)
      this._renderButton()
    })
  },

  _renderLiked () {
    this._likeButtonContainer.innerHTML = createUnlikeRestaurantButtonTemplate()

    const likeButton = document.querySelector('#likeButton')
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id)
      this._renderButton()
    })
  }
}

export default LikeButtonPresenter
