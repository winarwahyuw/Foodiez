import Home from '../views/pages/home'
import Detail from '../views/pages/detail'
import Favorite from '../views/pages/favorit'

const routes = {
  '/': Home,
  '/detail/:id': Detail,
  '/favorite': Favorite
}

export default routes
