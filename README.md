# Keenroutine
Keenroutine is a react web application that provides fast information regarding your routine trips in and around stockholm. The app gives you a simple-to-use interface to save your favorite stations in Stockholm and to fast find trips inbetween them. 

## Functionality
* User authentication with e-mail and password through firebase user authentication. 
* Database management through firebase realtime database.
* Ability to save your favorite SL-stations under aliases.
* Drag and drop functionality to sort and place your saved stations in your preffered order.
* Select where you are to get a prepared list of trips to your saved stations. 
* Real time information about the SL-traffic of your selected position.

## Project structure
The projects consists of a server and a client application. The server is located in root with it's corresponding package.json. The client application is located in /client, here is also where the main bulk of the code is. 

This is a react-redux project so all the usual suspects are there. Actions, Reducers, Components, package.json etc. The directory Pages hold the structure of the main pages of the app. The directory Helpers contains some helper functions and functionality to the project. 

## Design choices
We think this app will mostly get used on the go. So the design and styling are made with mobile first mindset. This means the app will probably look better if you use the app in a browser in mobile phone mode or straight up in a mobile phone. 

## APIs 
The APIs we have used in the project all come from [Trafiklab](https://www.trafiklab.se/). More specifically:
* [SL Hållplatser och linjer](https://www.trafiklab.se/api/sl-hallplatser-och-linjer-2)
* [SL Reseplanerare](https://www.trafiklab.se/api/sl-reseplanerare-31)
* [SL Realtidsinformation](https://www.trafiklab.se/api/sl-realtidsinformation-4)

## Backend/Server
Our backend consists of an Express proxy server. This server handles all the api-calls for the app to avoid CORS and to hide the actual requests from the user.

## Using Keenroutine
### Deployed 
The app is deployed on heroku. [Click here](https://keenroutine.herokuapp.com) to check the app out.

### Locally
To run the app locally you will need to install the dependencies. This is done by running `npm install` in both root and in client. Then you will need to start both the app and server. To start the server you need to be in root and run `node server.js`. To start the app, navigate into `/client` and run `npm start`. The server will start on localhost:5000 and the app will automatically open a tab for localhost:3000. 

