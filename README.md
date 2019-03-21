# keenroutine
Keenroutine is a react web application that provides fast and easy to read information regarding the trip to and from the users saved locations. These location can be school, work, gym etc. The app uses trafiklabs API [Reseplanerare 3.1](https://www.trafiklab.se/api/sl-reseplanerare-31) to route the trip from your location to all saved locations. Thus the user has a snappy board of information, making regular 'routine' trips easier.
## Work so far
In the current state we have login, database and API functionality. A very low fidelity UI has been implemented. Most views connect to the respective functionality. For example the add places page connects to the database. The project has been deployed using firebases deployment tools. The project can be viwed at [Keenroutine](https://keenroutine-f5ccb.firebaseapp.com/login)
## What is left to do?
A lot. In no perticular order:
### Stability
The app is not very stable. A user can access certain pages which will promptly crash if the user skipped login for example.
### Navigation
The navigation is not good. In the current state the user has to mmanually type in the URL. Here is the URLs which should be accessed in this order:
#### 1. /login
#### 1.5. /manage_places
#### 2. /select_origin
#### 3. /select_destination
#### 4. /travel_guide
### Cross origin issues
Currently most web browsers block our API-calls due to violation of the  same origin policy. Currently we circumvent this by using the firefox extension "CORS everywhere" which makes the browser allow cross origin requests. This is not safe and should be done in a separate browser where only the project is viewed. Our goal is to somehow allow out API-calls
### Style
Once the functionality is in a place we like we will begin styling the app. The UI is horrible in its current look. This will be fixed and is something we purposefully postponed.
### Additional functionality
We want to add more functionality as the project continues. For example geo location, and maybe more 'fun' functionality such as finding a podcast which is as long as the trip.
## File structure
### src
contains all code. Contains three folders 'Actions', 'Pages' and 'Reducers'. We will later add 'Components' once we hot up the UI.
#### Actions
Contains the file 'index.js' containing the actions used in redux.
#### Pages
Contains one .js file for each page of the application. Each of the files contains classes extending react components and renders the page. These will later be split up in the previously mentioned 'Components'
#### Reducers
Contains the .js file 'reducers.js' which is responsible for changing the current redux state of the project.
#### Files directly in src
**index.js** entry point for the project. Renders app and sets root of DOM and initializes redux state.
**App.js**: The react app. Initializes firebase supscriptions and renders a router routing URLs to the different pages.
**Other**: The remaining pages are styling files and react files.
#### Files outside of src
The remaining files are firebase configs, dependencies and other auto generated files.
## Running the project locally
To start run `npm start` from root

You need to add DB_CONFIG.js to be able to run it. Ask your closest admin
