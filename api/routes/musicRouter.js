const express = require('express'); // express server
const router = express.Router();    // express class to handle routes
// const musicCtrl = require('../controllers/Music');

// RESTful API endpoints
// use routes to access http verbs( GET, POST, PUT, DELETE)
// route handler has two parts - url/path and callback function
// router.get('/', (req, res) => {



// router.get('/', musicCtrl.index);   // get all music
// router.get('/:id', musicCtrl.show); // get music by id
// // router.get('/search/:query', musicCtrl.search); // get music by query
// router.get('/search/', musicCtrl.search); // get music by query
// // router.get('/search/:songs', musicCtrl.getSongs); // get song by query
// router.get('/album/:id', musicCtrl.getAlbum); // get album by id

const request = require('request'); // "Request" library
require('dotenv').config();
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = process.env.REDIRECT_URI; // Your redirect uri
const BASE_URI = process.env.BASE_URI;



/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
let generateRandomString = function (length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


var stateKey = 'spotify_auth_state';

router.use(cookieParser());

router.get('/login', (req, res) => {

    let state = generateRandomString(16);
    res.cookie(stateKey, state);

    // /authorize endpoint
    // your application requests authorization
    const scope = 'user-read-private user-read-email user-top-read';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));

})

router.get('/callback', (req, res) => {

    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                const access_token = body.access_token,
                    refresh_token = body.refresh_token;

                const options = {
                    // url: 'https://api.spotify.com/v1/me',
                    url: `${BASE_URI}/me`,
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/#' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }

});

router.get('/refresh_token', (req, res) => {

    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });

});

router.get('/top_five', async (req, res) => {
    // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
    const token = 'BQDDRT_igq4RhgQpC46zqOUIJxCOfwiafEgy3QjZ9xsC3zEYp-7zoAWq-x2h6scNKoddGhGsPILpXR9FJ4GNEZavWXbDSfIB9cPwG_snYzo6_fwhxyI9OzTJCAUHjq_yQ8yvBb4DOUj_ZTKZ-WJ2PYjfCymQgUVySmXWimQbGYWRNREw1R1xJXIZMB9TSLPY54OSwiVSdxDl5QZa4VUhNzJt0CHoB594xz-ijdjC5HCYlfWn8njimdeg-X10zotqeyYLEfU_D7-6u-laFy-cuIuPxJCUP1mpKePtWIykd1ysbbjXNgJxWuUucccERgt5muAE5tImtsrp5GXEIJnC-QRCsKcm46AqimPjkfeoeI0MiLM';
    async function fetchWebApi(endpoint, method, body) {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method,
            body: JSON.stringify(body)
        });
        return await res.json();
    }

    async function getTopTracks() {
        // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
        return (await fetchWebApi(
            'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
        )).items;
    }

    const topTracks = await getTopTracks();
    console.log(
        topTracks?.map(
            ({ name, artists }) =>
                `${name} by ${artists.map(artist => artist.name).join(', ')}`
        )
    );
});

module.exports = router;


/*
NOTES:
const getMusic = async (req, res, next) => {
    // set equal to music we find
    let music = await Music.findById({ _id: req.params.id });
    // if ()
}

// GET ALL - handle incoming GET requests    
router.get('/', (req, res) => {
    res.send('Route for All Music')
    res.status(200).json({
        message: 'Incoming GET request.',
    })
});

// handle POST requests express.Router() class
router.post('/', (req, res) => {
    res.status(200).json({
        message: 'POST request.',
    })
});

// handle POST requests by ID
router.post('/:id', (req, res) => {
    res.status(200).json({
        message: 'POST request by ID.',
    })
});

// GET by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        message: 'GET request by ID.',
        id: id,
    })
});

// PUT by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        message: 'PUT request by ID.',
        id: id,
    })
});

// DELETE by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        message: 'DELETE request by ID.',
        id: id,
    })
});

*/