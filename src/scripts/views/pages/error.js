const ErrorPage = {
  async render () {
    return `
        <div class="jumbotron" id="jumbotron-error">
          <div class="overlay">
            <h1 class="title">ERROR 404</h1>
            <p class="sub-title">The page you're looking is not found!</p>
            <a class="btn btn-secondary" href="#" aria-label="Aria back to home">Back to Home</a>
          </div>
        </div>
    `
  },

  async afterRender () {

  }
}

export default ErrorPage
