const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default
const ImageminMozjpeg = require('imagemin-mozjpeg')
const TerserPlugin = require('terser-webpack-plugin')

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
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      include: 'src/scripts/views/app.js'
    })]
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
          from: path.resolve(__dirname, 'src/public/images/'),
          to: path.resolve(__dirname, 'dist/images')
        },
        {
          from: path.resolve(__dirname, 'src/public/icons'),
          to: path.resolve(__dirname, 'dist/icons')
        }
      ]
    }),
    new WebpackPwaManifest({
      name: 'FOODIEZ',
      short_name: 'foodiez',
      description: 'A restaurant catalogue app v3',
      background_color: '#ffffff',
      theme_color: '#1a191c',
      crossorigin: 'use-credentials',
      filename: 'app.manifest',
      start_url: './index.html',
      icons: [
        {
          src: path.resolve('src/public/icons/foodiez-icon.png'),
          // src: path.resolve('dist/icons/foodiez-icon.png'),
          type: 'image/png',
          sizes: [48, 72, 96, 144, 192, 512],
          purpose: 'maskable any',
          destination: 'icons'
        }
      ]
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true
        })
      ]
    })
  ]
}
