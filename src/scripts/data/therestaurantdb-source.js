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

    return responseJson.error ? 'Not found restaurant' : responseJson.restaurant
  }

  static async putRestaurantReview (postData) {
    const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })

    const responseJson = await response.json()
    return responseJson.error ? 'Not found restaurant' : responseJson
  }
}
export default TheRestaurantDbSource
