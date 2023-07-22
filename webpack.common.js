const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
    sw: path.resolve(__dirname, 'src/scripts/sw.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/')
        }
      ]
    }),
    new WebpackPwaManifest({
      name: 'FOODIEZ',
      short_name: 'foodiez',
      description: 'A restaurant catalogue app v3',
      background_color: '#ffffff',
      crossorigin: 'use-credentials',
      filename: 'app.manifest.json',
      start_url: './index.html',
      icons: [
        {
          src: path.resolve('src/public/icons/foodiez-icon.png'),
          type: 'image/png',
          sizes: [48, 72, 96, 144, 192, 512],
          purpose: 'maskable any',
          destination: 'icons'
        }
      ]
    })
  ]
}
