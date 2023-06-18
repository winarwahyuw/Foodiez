import Home from '../pages/home';
import Detail from '../pages/detail';
import Favorite from '../pages/favorit';

const routes = {
  '/': Home,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
