const ErrorPage = {
  async render () {
    return `
        <div class="container">
          <div class="handling-page">
            <span class="handling-icon"><i class="fa fa-frown-o" aria-hidden="true"></i></span>
            <div class="handling-page-content">
              <h3 class="title my-2">Oppss..</h3>
              <p class="message">The page you're looking is not found</p>
            </div>
            <div class="handling-page-footer">
              <a class="btn btn-secondary" href="/">Back to Home</a>
            </div>
          </div>
        </div>
    `
  },

  async afterRender () {

  }
}

export default ErrorPage
