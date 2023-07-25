import TheRestaurantDbSource from '../../data/therestaurantdb-source'
import { createRestaurantItem } from '../templates/template-creator'

const Home = {
  async render () {
    return `
    <div class="jumbotron" id="jumbotron-home">
      <div class="overlay">
        <h1 class="title">Good Food Brings <br> Good Mood</h1>
        <p class="sub-title">Find the delicious food to make your day!</p>
        <a class="btn btn-secondary" href="#" aria-label="Aria Explore">EXPLORE</a>
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
            <button id="left-arrow" aria-label="left arrow" class="btn arrow"><i class="fa fa-angle-left"></i></button>
            <button id="right-arrow" aria-label="right arrow" class="btn arrow"><i class="fa fa-angle-right"></i></button>
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
          <button type="submit" class="btn-outline-primary">SEND</button>
        </form>
      </div>
    </div>
    `
  },

  async afterRender () {
    const nextBtn = document.getElementById('right-arrow')
    const prevBtn = document.getElementById('left-arrow')
    const slider = document.getElementById('popular')
    const skipLink = document.getElementById('skip-link')
    const content = document.querySelector('#content-home')

    skipLink.addEventListener('click', (e) => {
      e.preventDefault()
      content.scrollIntoView({ behavior: 'smooth' })
      skipLink.blur()
    })

    const restaurants = await TheRestaurantDbSource.listRestaurant()
    restaurants.forEach((restaurant) => {
      slider.innerHTML += createRestaurantItem(restaurant)
    })

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
