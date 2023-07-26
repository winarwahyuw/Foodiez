import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter'
import FavoriteIdb from '../../src/scripts/data/favorite.-idb'

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurant: FavoriteIdb,
    restaurant
  })
}

export { createLikeButtonPresenterWithRestaurant }
