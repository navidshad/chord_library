# chord_library
This is a server/client application for Kurdish guitar chords.

## Install
```
// server
$ cd server
$ npm i

// website
$ cd website
$ npm i
```

## Run
You must check several options for runing this system:

1. Open the app.js from server directory and be sure [run] method being exported and [dontListen] property is true.

2. Create a .env file inside website directory and put thes lines:
```
NODE_ENV=production
VUE_APP_BASE_URL=https://data.goranee.ir
```

3. Build nuxt app
```
// inside website directory
$ npm run build
``` 

4. Run app
```
$ node host.js
```