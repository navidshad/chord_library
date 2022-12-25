# chord_library

This is a website for providing Kurdish chords, it's live now and you can se it here [Goranee](https://goranee.ir/). 
It's a none profit project that I lanched with one musician friend. This project is providing a premium value and is going to be monetized in close future.

| Tab page| Description |
|:---:|---|
|<img width="auto" height="30%" src="https://github.com/navidshad/chord_library/blob/main/misc/tab_page.png" /> |<p>As you see languege is Kurdish and thoese English words on top of each line are chords. <br><br>There is also a chord transpose feature that users can change it based on their voice to find the best chord match.</p> |

## Build and run docker image
```
docker build -t chord-library .
docker run -d -p 8080:80 -p 81:81 --env-file .env --link mongo -v uploads:/app/uploads  --name chord-library chord-library
```

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
