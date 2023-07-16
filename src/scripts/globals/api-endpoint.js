import CONFIG from './config'

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  SEARCH: (query) => `${CONFIG.BASE_URL}search?q=${query}`,
  IMAGE_SMALL: (id) => `${CONFIG.BASE_URL}images/small/${id}`,
  IMAGE_MEDIUM: (id) => `${CONFIG.BASE_URL}images/medium/${id}`,
  IMAGE_LARGE: (id) => `${CONFIG.BASE_URL}images/large/${id}`
}

// const API_ENDPOINT = {
//   NOW_PLAYING: `${CONFIG.BASE_URL}movie/now_playing?api_key=${CONFIG.KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
//   UPCOMING: `${CONFIG.BASE_URL}movie/upcoming?api_key=${CONFIG.KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
//   DETAIL: (id) => `${CONFIG.BASE_URL}movie/${id}?api_key=${CONFIG.KEY}`
// }

export default API_ENDPOINT
