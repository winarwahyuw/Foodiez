import TheRestaurantDbSource from '../../data/therestaurantdb-source'
import { createRestaurantItem, createHandlingPage } from '../templates/template-creator'

const Home = {
  async render () {
    return `
    <div class="jumbotron" id="jumbotron-home">
      <picture>
        <source media="(max-width: 600px)" type="image/webp" srcset="./images/hero-image_2-small.webp">
        <source media="(max-width: 600px)" type="image/jpg" srcset="./images/hero-image_2-small.jpg">
        <img src="./images/hero-image_2-large.webp" id="hero-img" alt="Hero Image" class="img hero-img"/>
      </picture>

      <div class="overlay">
        <div class="overlay-content">
          <h1 class="title">Good Food Brings <br> Good Mood</h1>
          <p class="sub-title">Find the delicious food to make your day!</p>
          <div class="form">
            <input type="text" placeholder="Restaurant name.." name="query" id="query" value="" class="form-input">
            <button id="search-restaurant" aria-label="Search Button" type="button" class="btn-outline-primary">SEARCH</button>
          </div>
        </div>
      </div>
    </div>


    <div class="container" id="content-home">
      <div class="sub-main" id="our-story">
        <h2>Our Story</h2>
        <p>Food is more than sustenance. It is a vibrant tapestry of flavors, textures, and aromas that dance upon the taste buds. It has the power to evoke memories, forge connections, and ignite the senses. From the sizzling sound of a steak searing on a hot grill to the delicate aroma of freshly baked bread, food entices and captivates us. It is a language that transcends borders, bringing people together to share in the joy of nourishment and culinary exploration. Whether it's the simplicity of a perfectly ripe fruit or the complexity of a multi-course feast, food is a universal pleasure that celebrates culture, creativity, and the beauty of the senses.</p>
      </div>

      <div class="sub-main slider">
        <div class="slider-header">
          <div class="left">
            <h2>Populer Nusantara</h2>
            <p>Andalan setiap kota</p>
          </div>
          <div class="right">
            <button id="left-arrow" aria-label="left arrow" class="btn arrow" aria-label="Slide to Left"><i class="fa fa-angle-left"></i></button>
            <button id="right-arrow" aria-label="right arrow" class="btn arrow" aria-label="Slide to Right"><i class="fa fa-angle-right"></i></button>
          </div>
        </div>
        <div class="slider-content" id="popular">
        </div>
      </div>

      <div class="sub-main" id="subscribe">
        <h2>Stay Connected with Foodiez</h2>
        <p>Subscribe for Delicious Updates!</p>
        <form action="#" method="post">
          <input type="email" placeholder="yours@mail.com" name="subscribe_email" id="subscribe-email" class="form-input">
          <button type="submit" class="btn-outline-primary" aria-label="Send Button">SEND</button>
        </form>
      </div>
    </div>

    <div class="container hide" id="search-results-container">
      <div class="search-results" id="search-results-content"></div>
      <div id="search-not-found"></div>
    </div>
    `
  },

  async afterRender () {
    const nextBtn = document.getElementById('right-arrow')
    const prevBtn = document.getElementById('left-arrow')
    const slider = document.getElementById('popular')
    const skipLink = document.getElementById('skip-link')
    const content = document.querySelector('#content-home')
    const searchResultContainer = document.getElementById('search-results-container')
    const searchResultContent = document.getElementById('search-results-content')
    const searchButton = document.getElementById('search-restaurant')
    const query = document.getElementById('query')
    const searchNotFound = document.getElementById('search-not-found')

    skipLink.addEventListener('click', (e) => {
      e.preventDefault()
      content.scrollIntoView({ behavior: 'smooth' })
      skipLink.blur()
    })

    const restaurants = await TheRestaurantDbSource.listRestaurant()
    restaurants.forEach((restaurant) => {
      slider.innerHTML += createRestaurantItem(restaurant)
    })

    searchButton.addEventListener('click', async (e) => {
      e.preventDefault()
      onSearch()
    })

    query.addEventListener('keypress', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onSearch()
      }
    })

    const onSearch = async () => {
      const searchKey = query.value
      const searchResults = await TheRestaurantDbSource.searchRestaurant(searchKey)

      searchResultContainer.classList.remove('hide')
      content.classList.add('hide')

      if (searchResults?.length > 0) {
        searchResultContent.classList.remove('hide')
        searchNotFound.classList.toggle('hide')
        searchResults.forEach((resto) => { searchResultContent.innerHTML += createRestaurantItem(resto) })
      } else {
        searchResultContent.classList.toggle('hide')
        searchNotFound.classList.remove('hide')
        searchNotFound.innerHTML = createHandlingPage('SORRY...', 'The restaurant you were looking is not found')
        searchResultContent.innerHTML = ''
      }
    }

    function scrollLeft () {
      setTimeout(() => {
        slider.scrollTo(slider.scrollLeft + 600, window.scrollY)
      }, 10)
    }

    function scrollRight () {
      setTimeout(() => {
        slider.scrollTo(slider.scrollLeft - 600, window.scrollY)
      }, 10)
    }

    nextBtn.addEventListener('click', scrollLeft)
    prevBtn.addEventListener('click', scrollRight)
  }
}
export default Home
