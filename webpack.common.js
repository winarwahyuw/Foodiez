const path = require('path')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default
const ImageminMozjpeg = require('imagemin-mozjpeg')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js')
    // sw: path.resolve(__dirname, 'src/scripts/sw.js')
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
    })],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
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
          from: path.resolve(__dirname, 'src/public'),
          to: path.resolve(__dirname, 'dist')
          // globOptions: {
          //   // CopyWebpackPlugin mengabaikan berkas yang berada di dalam folder images
          //   ignore: ['**/images/**']
          // }
        }
        // {
        //   from: path.resolve(__dirname, 'src/public/icons'),
        //   to: path.resolve(__dirname, 'dist/icons')
        // }
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
          purpose: 'any',
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
    }),
    new BundleAnalyzerPlugin(),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 50
          }
        }
      ],
      overrideExtension: true
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/restaurant-api.dicoding.dev\//,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: `Foodiez-API-${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'Foodiez-Home',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    })
  ]
}
