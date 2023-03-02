# Project Overview

This project uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) to perform a generalized global search for Artists, Albums, and Tracks. This project contains both a frontend and a backend in a microservice structure that keeps track of OAuth JSON web tokens. This project serves as a template for other projects inside of the Project Portfolio III course. **DO NOT COPY**.

# Prerequisites

- Docker Engine >= latest (for Mac or other platform)
- NodeJS >= v16.13.0
- Yarn >= v1.22.19
- npm >= v8.1.0
- Brew >= v3.4.3 (if MacOS)
- MySQL Server >= v8.0.28
- Chrome/Firefox/Safari/Edge >= Latest 2 major versions

## Other Considerations

Ports `3000`, and `3001` must be open on host OS. Make sure no other applications are running on those ports by running the following command: 

	sudo lsof -nP -i4TCP:3000 | grep LISTEN && sudo lsof -nP -i4TCP:3001 | grep LISTEN

If any results shows are displayed then you must close the application running on either of those ports. 

# Getting Started

In order to setup the project we will need to setup our `.env` file. You can do this by making a copy of our `.env.dist` and naming it to `.env` using the following command.

	cp .env.dist .env && vim .env

Place all of your environment variables inside the vim window, then save. After you have done that you will need to install all of your `node_modules` using the following command. Make sure you have yarn installed globally as well. 

	npm install -g yarn
	yarn

After yarn has finished installing all of your `node_modules` you can now run the project. You will need to open two different bash sessions. One for the frontend app and one for the backend Express application. 

**To Run Nuxt.js (frontend)**

	cd nuxt
	yarn dev

**To Run Express (backend)**

	yarn watch

# Links

The links to the project are as follows: 

- [http://localhost:3000](http://localhost:3000) - Link to the frontend (Nuxt.js) application. This is the primary user interface of the Spotify application
- [http://localhost:3001](http://localhost:3001) - Link to the backend (Express) API.
- [http://localhost:3001/spotify/v1](http://localhost:3001/spotify/v1) - Link to the Spotify API middleware. 
- [http://localhost:3001/spotify/v1/status](http://localhost:3001/spotify/v1/status) - Endpoint to check the status of our application's JWT. Returns true if a valid JWT exists. False otherwise.
- [http://localhost:3001/spotify/v1/login](http://localhost:3001/spotify/v1/login) - Endpoint request a new JWT from Spotify using the authentication workflow
- [http://localhost:3001/spotify/v1/search](http://localhost:3001/spotify/v1/search) - Endpoint for a general/global search to Spotify. Returns JSON of all results. 
