const { loadNuxt, build } = require('nuxt')

// read .env file
const dotenv = require('dotenv');
dotenv.config({
    path: require('path').join(__dirname, '.env')
});

const app = require('express')()
const isDev = process.env.NODE_ENV !== 'production'

async function start() {
    // We get Nuxt instance
    const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

    // Render every route with Nuxt.js
    app.use(nuxt.render)

    // Build only in dev mode with hot-reloading
    if (isDev) {
        build(nuxt)
    }
}

start()
module.exports = app;