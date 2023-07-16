import API_ENDPOINT from '../globals/api-endpoint'
class TheRestaurantDbSource {
  static async listRestaurant () {
    const response = await fetch(API_ENDPOINT.LIST)
    const responseJson = await response.json()

    return responseJson.error ? 'Not found restaurant' : responseJson.restaurants
  }

  static async searchRestaurant () {
    const response = await fetch(API_ENDPOINT.SEARCH)
    const responseJson = await response.json()
    return responseJson.results
  }

  static async detailRestaurant (id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id))
    const responseJson = await response.json()
    console.log(responseJson)

    return responseJson.error ? 'Not found restaurant' : responseJson.restaurant
  }
}
export default TheRestaurantDbSource

// class TheMovieDbSource {
//   static async nowPlayingMovies () {
//     const response = await fetch(API_ENDPOINT.NOW_PLAYING)
//     const responseJson = await response.json()
//     return responseJson.results
//   }

//   static async upcomingMovies () {
//     const response = await fetch(API_ENDPOINT.UPCOMING)
//     const responseJson = await response.json()
//     return responseJson.results
//   }

//   static async detailMovie (id) {
//     const response = await fetch(API_ENDPOINT.DETAIL(id))
//     return response.json()
//   }
// }
// export default TheMovieDbSource
