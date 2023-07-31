const ErrorPage = {
  async render () {
    return `
        <div class="jumbotron" id="jumbotron-error">
          <picture>
            <source media="(max-width: 600px)" srcset="./images/hero-image_1-small.jpg">
            <img src="./images/hero-image_1-large.jpg" id="hero-img" alt="Hero Image" class="img hero-img"/>
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
              <a class="btn btn-secondary" href="/home">Back to Home</a>
            </div>
          </div>
        </div>
    `
  },

  async afterRender () {

  }
}

export default ErrorPage
