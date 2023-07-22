import 'regenerator-runtime'
import CacheHelper from './utils/cache-helper'
// Daftar asset yang akan dicaching
const assetsToCache = [
  './',
  './icons/maskable_icon.png',
  './icons/maskable_icon_x48.png',
  './icons/maskable_icon_x72.png',
  './icons/maskable_icon_x96.png',
  './icons/maskable_icon_x128.png',
  './icons/maskable_icon_x192.png',
  './icons/maskable_icon_x384.png',
  './icons/maskable_icon_x512.png',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.manifest.json',
  './sw.bundle.js'
]

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache())
})

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request))
})

self.addEventListener('install', (event) => {
  console.log('Installing Service Worker ...')
// TODO: Caching App Shell Resource
})
self.addEventListener('activate', (event) => {
  console.log('Activating Service Worker ...')
// TODO: Delete old caches
})

self.addEventListener('fetch', (event) => {
  console.log(event.request)
  event.respondWith(fetch(event.request))
// TODO: Add/get fetch request to/from caches
})
