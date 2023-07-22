import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.scss'
import '../styles/responsive.scss'
import App from './views/app'
import swRegister from './utils/sw-register'
import WebSocketInitiator from './utils/websocket-initiator'
import CONFIG from './globals/config'
import UrlParser from './routes/urlParser'
// import routes from './routes/routes'

const app = new App({
  button: document.querySelector('#btn-dropdown'),
  drawer: document.querySelector('#dropdown-menu'),
  content: document.querySelector('#main-content')
})

window.addEventListener('hashchange', () => {
  const urlCombiner = UrlParser.parseActiveUrlWithCombiner()
  const urlWithoutCombiner = UrlParser.parseActiveUrlWithoutCombiner()

  console.log(window.location.hash.toLowerCase())
  console.log(urlCombiner)
  console.log(urlWithoutCombiner)
  console.log('haschange')
  setTimeout(() => {
    app.renderPage()
    window.scrollTo(0, 0)
  }, 5000)
})

window.addEventListener('load', () => {
  app.renderPage()
  console.log('load')

  swRegister()
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER)
  // Initialize footer tools
  // FooterToolsInitiator.init({
  //   subscribeButton: document.querySelector('#subscribePushNotification'),
  //   unsubscribeButton: document.querySelector('#unsubscribePushNotification')
  // })
})
