import UrlParser from '../../routes/urlParser'
import TheMovieDbSource from '../../data/themoviedb-source'
import LikeButtonInitiator from '../../utils/like-button-initiator'
import { createMovieDetailTemplate } from '../templates/template-creator'

const Detail = {
  async render () {
    return `
    <div id="movie"></div>
    <div id="likeButtonContainer"></div>
    `
  },
  async afterRender () {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const movie = await TheMovieDbSource.detailMovie(url.id)

    const movieContainer = document.querySelector('#movie')
    movieContainer.innerHTML = createMovieDetailTemplate(movie)

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average
      }
    })
  }
}
export default Detail
