import DrawerInitiator from '../utils/drawer-initiator'
import UrlParser from '../routes/urlParser'
import routes from '../routes/routes'
import ErrorPage from '../views/pages/error'

class App {
  constructor ({ button, drawer, content }) {
    this._button = button
    this._drawer = drawer
    this._content = content

    this._initialAppShell()
  }

  _initialAppShell () {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content
    })
    // kita bisa menginisiasikan komponen lain bila ada
  }

  async renderPage () {
    const url = UrlParser.parseActiveUrlWithCombiner()
    try {
      const page = routes[url]
      this._content.innerHTML = await page.render()
      await page.afterRender()
    } catch (error) {
      this._content.innerHTML = await ErrorPage.render()
      await ErrorPage.afterRender()
    }
  }
}
export default App
