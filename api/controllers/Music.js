// const { Artist, Albums, Tracks } = require('./models');
// const Music = require('./models/music');
const axios = require('axios');
require('dotenv').config();
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const cors = require('cors');


// const options = {
//     headers: {
//         'x-api-key': process.env.SPOTIFY_API_KEY,
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
//     },
// };


const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = process.env.REDIRECT_URI; // Your redirect uri
const BASE_URI = process.env.BASE_URI;

const getTopTracks = `${BASE_URI}/v1/me/top/tracks?limit=10`;
const getTopArtists = `${BASE_URI}/v1/me/top/artists?limit=10`;

// const url = 'https://api.spotify.com/v1/me/player/currently-
const url = `${BASE_URI}/v1/me/player/currently-`;
const limit = `?` + "limit" + `=`;
const ln = 10;
// const sq = `search?` + `q=${process.env.QUERY}&` + `type=track&
const sq = `search?` + `q=`;
console.log(sq);
console.log(`${url}${limit}${ln}`);

exports.getSongs = async () => {
    console.log('Music Data Service Controller');
    try {
        const response = await axios.get(`${url}${limit}${ln}`, options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
    return null;

    // const artists = await Artist.findAll({

}


// RESTful API endpoints
// use routes to access http verbs( GET, POST, PUT, DELETE)
// route handler has two parts - url/path and callback function
// router.get('/', (req, res) => {

// exports.index = async (req, res) => {
// const artists = await Artist.findAll({
//     attributes: ['id', 'name'],
//     include: [
//         {
//             model: Albums,
//             attributes: ['id', 'title', 'artist_id'],
//             include: [
//                 {
//                     model: Tracks,
//                     attributes: ['id', 'title'],
//                 }
//             ],
//         },
//     ],
// });
//     res.send('Route for All Music')
//     res.status(200).json({
//         message: 'Incoming GET request.',
//     })
// }


// GET ALL - handle incoming GET requests    
exports.index = async (req, res) => {
    // res.send(`Music -> INDEX <- Base uri ${BASE_URI}!`)
    // res.send('Route for All Music')
    res.status(200).json({
        message: 'Incoming GET request: index.',
    })
}


// GET by ID
exports.show = async (req, res) => {
    const id = req.params.id;
    // const id = 10;
    res.status(200).json({
        message: 'GET request by ID: show.',
        id: id,
    })
}

exports.getAlbum = async (req, res) => {
    const id = req.params.id;
    const market = req.query.market;
    // const id = '4aawyAB9vmqN3uQ7FjRGTy';
    // res.send(`Music -> ALBUM <- Base uri ${BASE_URI}!`)
    res.status(200).json({
        message: 'GET request by ID: getAlbum.',
        id: id,
    })
}

exports.search = async (req, res) => {
    res.send(`Music -> SEARCH <- Base uri ${BASE_URI}!`)
    // await axios({
    //     // method: 'get',
    //     // url: `${BASE_URI}/search`,
    //     params: {
    //         q: req.query.q,
    //         type: 'artist,album,track',
    //         limit: 10,
    //     },
    //     // headers: {
    //     //     'Authorization': `Bearer ${process.env.SPOTIFY_TOKEN}`,
    //     //     'Content-Type': 'application/json',
    //     // },
    //     // json: true,
    //     // responseType: 'json',
    //     // timeout: 10000,
    //     // maxRedirects: 0,
    //     // validateStatus: function (status) {
    //     //     return status >= 200 && status < 300;
    //     // },
    //     // transformResponse: function (data) {
    //     //     // return data.tracks.items;
    //     //     return data.tracks;
    //     // },
    //     // retry: 0,
    //     // retryDelay: 1000,
    //     // maxRetries: 10,
    //     // retryDelayOptions: {
    //     //     initialDelay: 1000,
    //     //     maxDelay: 10000,
    //     // },
    // }).then(data => {
    //     console.log(data);
    //     res.status(200).json(data.data);
    // }).catch(error => {
    //     console.log(error);
    //     res.status(500).json(error);
    // })
}


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

const stateKey = 'spotify_auth_state';

const login = async (req, res) => {

    let state = generateRandomString(16);
    res.cookie(stateKey, state);

    // /authorize endpoint
    // your application requests authorization
    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
}; // end of login endpoint

const callback = async (req, res) => {

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
};

const refreshToken = async (req, res) => {

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
};

module.exports = {
    login,
    callback,
    refreshToken
}