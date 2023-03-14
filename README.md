# 💻 PROJECT AND PORTFOLIO III: WEB DEVELOPMENT

### Pamela Fennell

🆔 &nbsp; 0001437638

📪 &nbsp; pyfennell@student.fullsail.edu


![Degree Program](https://img.shields.io/badge/Degree-Web%20Development-orange?logo=gnometerminal)
<br>
![Class Name](https://img.shields.io/badge/Class-Project%20and%20Portfolio%20III-orange?logo=react)

# 📢 &nbsp; Project Overview: Spotify Web API

## Description: 
To build a music search app using the [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

## Features: 
The features of this app will allow you to search and display the Artists, their Albums, and their tracks. 
- Login Screen
- Search Page
- Result Thumbnail

## Functionality: 
The app will consume data from the API to display content on the frontend.
- Display Login screen if no Spotify Access Token is found 
	- If found and hasn’t expired then take user to search page.
- Search Page: Display a "no results" message in the design: 
	- if no search is performed, or 
	- if API call returned with no results.
- Each result thumbnail must link out to a Spotify web player link. 

### Additional Project Information:
- UI/UX design of Spotify Features
- **FrontEnd: Next.js** 
	- Frontend application is decoupled from backend 
- **Backend: Express.js**
	- Backend application handles Spotify Access Token. 


# 📚 Prerequisites
- Express 
- NodeJS 
- React
- npm 
- Monogo DB 
- Chrome/Firefox/Safari/Edge 


# 🏃 Getting Started

## In this project you can RUN: 
``npm run dev:next``
> This will concurrently run both the frontend at the backend
<br>

	- Builds the frontend for production to the .next folder. Compiles the app with `next build` Then Starts the app in production mode.

	- Runs the app in the development mode, concurrenlty for both the frontend and the backend.

Opens frontend on [http://localhost:3000](http://localhost:3000) and then opens backend on [http://localhost:8000](http://localhost:8000)


The page will reload when you make changes.\
You may also see any lint errors in the console.
<br>

``npm run next``
> Runs the Frontend of the app in the development mode
<br>

``npm run api``
> Runs the Backend of the app in the development mode
<br>

#

# 🏆 Links

The links to the project are as follows: 

- [http://localhost:3000](http://localhost:3000) - Link to the frontend (Next.js) application. This is the primary user interface of the Spotify application
- [http://localhost:8000](http://localhost:8000) - Link to the backend (Express) API.
- [http://localhost:8000/spotify/v1](http://localhost:8000/spotify/v1) - Link to the Spotify API middleware. 
- [http://localhost:8000/spotify/v1/status](http://localhost:8000/spotify/v1/status) - Endpoint to check the status of our application's JWT. Returns true if a valid JWT exists. False otherwise.
- [http://localhost:8000/spotify/v1/login](http://localhost:8000/spotify/v1/login) - Endpoint request a new JWT from Spotify using the authentication workflow
- [http://localhost:8000/spotify/v1/search](http://localhost:8000/spotify/v1/search) - Endpoint for a general/global search to Spotify. Returns JSON of all results. 
