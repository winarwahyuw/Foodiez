const ErrorPage = {
  async render () {
    return `
        <div class="jumbotron" id="jumbotron-error">
          <picture>
            <source media="(max-width: 600px)" type="image/webp" srcset="./images/not-found-page.webp">
            <source media="(max-width: 600px)"  type="image/png" srcset="./images/not-found-page.png">
            <img src="./images/not-found-page.png" id="hero-img" alt="Hero Image" class="img hero-img"/>
          </picture>
          <div class="overlay">
            <div class="overlay-content">
              <h1 class="title">ERROR 404</h1>
            </div>
          </div>
        </div>

        <div class="container" id="content-error">
          <div class="handling-page">
            <span class="handling-icon"><i class="fa fa-frown-o" aria-hidden="true"></i></span>
            <div class="handling-page-content">
              <p class="title my-2">The page you're looking is not found!</p>
            </div>
            <div class="handling-page-footer">
              <a class="btn btn-secondary" href="/">Back to Home</a>
            </div>
          </div>
        </div>
    `
  },

  async afterRender () {
    const heroImg = document.getElementById('hero-img')

    const imageLoadError = () => {
      console.log('failed render image')
      const jumbotron = document.getElementById('jumbotron-error')
      jumbotron.classList.remove('jumbotron')
      jumbotron.classList.add('jumbotron-error')
    }

    heroImg.setAttribute('onerror', imageLoadError())
  }
}

export default ErrorPage
