# chord_library
This is a website for providing Kurdish chords, it's live now and you can se it here [Goranee](https://goranee.ir/). it's a none profit project that I lanched with one musician friend.

This project is providing a premium value and is going to be monetized in close future.

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