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
        // {
        //   src: path.resolve('/icons/icon-96x96.png'),
        //   type: 'image/png',
        //   size: '96x96',
        //   purpose: 'any maskable'
        // },
        // {
        //   src: path.resolve('/icons/icon-128x128.png'),
        //   type: 'image/png',
        //   size: '128x128',
        //   purpose: 'any maskable'
        // },
        // {
        //   src: path.resolve('dist/icons/icon-144x144.png'),
        //   type: 'image/png',
        //   size: '144x144',
        //   purpose: 'any maskable'
        // },
        // {
        //   src: path.resolve('dist/icons/icon-152x152.png'),
        //   type: 'image/png',
        //   size: '152x152',
        //   purpose: 'maskable'
        // }
      ]
    })
  ]
}
