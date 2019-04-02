// const key = require("../platsuppslagAPIKey.js");
const dotenv = require('dotenv')
const express = require('express')
const fetch = require("node-fetch")
const path = require('path');
const app = express()
const port = process.env.PORT || 5000;

dotenv.config(); // seys up the env variables

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}

//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})

// app.get('/selectDestinationTime', (req, res) => {
//     console.log(req.query);
//     let urlParams = "";
//     for (let key in req.query) {
//         if (req.query.hasOwnProperty(key)) {
//             if(req.query[key] !== undefined)
//                 urlParams += "&" + key + "=" + req.query[key]
//         }
//     }
//     fetch("https://api.sl.se/api2/TravelplannerV3_1/trip.json?" + urlParams)
//         .then(res => res.json())
//         .then(json => {
//             res.send(json)
//     });
// })
//
// app.get('/searchStation', (req, res) => {
//     console.log(req.query);
//     let requestURL = "https://api.sl.se/api2/typeahead.json?key=" + process.env.REACT_APP_PlatsuppslagAPI + "&searchstring=" + req.query.searchWord;
//     fetch(requestURL)
//         .then(res => res.json())
//         .then(json => {
//             res.send(json)
//     });
// })