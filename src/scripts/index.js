import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.scss'
import '../styles/responsive.scss'
import App from './views/app'
import swRegister from './utils/sw-register'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

const app = new App({
  button: document.querySelector('#btn-dropdown'),
  drawer: document.querySelector('#dropdown-menu'),
  content: document.querySelector('#main-content')
})

window.addEventListener('hashchange', () => {
  app.renderPage()
  window.scrollTo(0, 0)
})

window.addEventListener('load', () => {
  console.log('lalala render')
  app.renderPage()

  swRegister()
  // WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER)
  // Initialize footer tools
  // FooterToolsInitiator.init({
  //   subscribeButton: document.querySelector('#subscribePushNotification'),
  //   unsubscribeButton: document.querySelector('#unsubscribePushNotification')
  // })
})
