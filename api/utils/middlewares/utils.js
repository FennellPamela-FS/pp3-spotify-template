// music middlewares

// display login 
music.get('/login', musicCtrl.login)

// confirm login
music.get('/auth', musicCtrl.jwt, musicCtrl.auth)

// spotify access token
music.get('/token', musicCtrl.jwt, musicCtrl.status)

// display whether or not search results exist
music.get('/status', musicCtrl.jwt, musicCtrl.status)

// display search results
music.get('/search', musicCtrl.jwt, musicCtrl.search)