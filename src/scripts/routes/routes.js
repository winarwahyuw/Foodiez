import Home from '../views/pages/home'
import Detail from '../views/pages/detail'
import Favorite from '../views/pages/favorit'
import NowPlaying from '../views/pages/now-playing'
import Upcoming from '../views/pages/upcoming'
import Like from '../views/pages/like'

const routes = {
  '/': Home,
  '/now-playing': NowPlaying,
  '/upcoming': Upcoming,
  '/detail/:id': Detail,
  '/favorite': Favorite,
  '/like': Like
}

export default routes
