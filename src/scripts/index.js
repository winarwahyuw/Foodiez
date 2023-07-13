import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.scss'
import '../styles/responsive.scss'
import './components/cardElement'
import data from '../DATA.json'
import App from './views/app'
import swRegister from './utils/sw-register'
import WebSocketInitiator from './utils/websocket-initiator'
import CONFIG from './globals/config'

// eslint-disable-next-line no-unused-vars
const app = new App({
  button: document.querySelector('#btn-dropdown'),
  drawer: document.querySelector('#dropdown-menu'),
  content: document.querySelector('#main-content')
})

const { restaurants } = data
const PopularSection = document.getElementById('popular')
const nextBtn = document.getElementById('right-arrow')
const prevBtn = document.getElementById('left-arrow')
const slider = document.getElementById('popular')

restaurants.forEach((resto) => {
  const CardElement = document.createElement('card-element')

  CardElement.setAttribute('card-element', resto.id)
  CardElement.setAttribute('image', resto.pictureId)
  CardElement.setAttribute('name', resto.name)
  CardElement.setAttribute('rating', resto.rating)
  CardElement.setAttribute('city', resto.city)

  PopularSection.appendChild(CardElement)
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

window.addEventListener('hashchange', () => {
  app.renderPage()
  console.log('haschange')
})

window.addEventListener('load', () => {
  app.renderPage()
  swRegister()
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER)
  console.log('load')
})
