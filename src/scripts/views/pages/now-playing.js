import TheMovieDbSource from '../../data/themoviedb-source'
import { createMovieItemTemplate } from '../templates/template-creator'

const NowPlaying = {
  async render () {
    return `
      <div id='now-playing'>
        <h2>Now Playing Page</h2>
        <div id='now-playing-content'>
        
        </div>
      </div>
      `
  },
  async afterRender () {
    const movies = await TheMovieDbSource.nowPlayingMovies()
    const moviesContainer = document.getElementById('now-playing-content')

    movies.forEach((movie) => {
      moviesContainer.innerHTML += createMovieItemTemplate(movie)
    })
  }
}
export default NowPlaying
