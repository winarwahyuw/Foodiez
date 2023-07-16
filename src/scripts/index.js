import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.scss'
import '../styles/responsive.scss'
import App from './views/app'
import swRegister from './utils/sw-register'
import WebSocketInitiator from './utils/websocket-initiator'
import CONFIG from './globals/config'
// import FooterToolsInitiator from './utils/footer-tools-initiator'

// eslint-disable-next-line no-unused-vars
const app = new App({
  button: document.querySelector('#btn-dropdown'),
  drawer: document.querySelector('#dropdown-menu'),
  content: document.querySelector('#main-content')
})

window.addEventListener('hashchange', () => {
  app.renderPage()
  console.log('haschange')
})

window.addEventListener('load', () => {
  app.renderPage()
  swRegister()
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER)
  // Initialize footer tools
  // FooterToolsInitiator.init({
  //   subscribeButton: document.querySelector('#subscribePushNotification'),
  //   unsubscribeButton: document.querySelector('#unsubscribePushNotification')
  // })
})
