
const querystring = require('querystring');
const request = require('request');
const axios = require('axios');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const jwt = require('jwt-simple')
// const User = require('../models/user')
// const config = require('../config')

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = process.env.REDIRECT_URI; // Your redirect uri
const BASE_URI = process.env.BASE_URI;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

const account_service = process.env.SPOTIFY_ACCOUNT_SERVICE;

// const tokenForUser = user => {
//     const timestamp = new Date().getTime()
//     return jwt.encode({
//         sub: user.id,
//         iat: timestamp,
//     }, config.secret)
// }


// generate a random string of numbers and letters
let generateRandomString = function (length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const stateKey = 'spotify_auth_state';

const login = async (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // /authorize endpoint
    // your application requests authorization
    const scope = 'user-read-private user-read-email user-library-read user-top-read playlist-modify-public playlist-read-private';
    // redirect to the authorization endpoint
    res.redirect(`${account_service}?` +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
}; // end of login endpoint

const auth = async (req, res) => {
    if (req.access_token) {
        // res.redirect(`${NEXTAUTH_URL}?access_token=${req.access_token}&refresh_token=${req.refresh_token}`);
        res.redirect(`${NEXTAUTH_URL}?access_token=${req.access_token}&refresh_token=${req.refresh_token}`);
    } else {
        res.redirect(`${NEXTAUTH_URL}?error=access_denied`);
    }
}

const index = (req, res) => {
    res.cookie(stateKey);
    res.redirect(`${NEXTAUTH_URL}`);
}; // end of logout endpoint

const logout = (req, res) => {
    res.clearCookie(stateKey);
    res.redirect(`${NEXTAUTH_URL}`);
}; // end of logout endpoint

const callback = (req, res) => {
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
                // res.redirect('/#' +
                res.redirect(`${NEXTAUTH_URL}/api/auth/signin?` +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
                // res.redirect('/api/v1/auth/index?');
                // res.redirect(`${NEXTAUTH_URL}/api/auth/callback?access_token=${access_token}&refresh_token=${refresh_token}`);
                // res.redirect(`${NEXTAUTH_URL}/api/auth/callback/spotify`);
                // res.redirect(`${NEXTAUTH_URL}/api/auth/callback/spotify`);
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
};   // end of callback endpoint

const refreshToken = (req, res) => {

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
}

module.exports = {
    auth,
    index,
    login,
    logout,
    callback,
    refreshToken,
};