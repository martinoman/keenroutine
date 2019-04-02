const key = require("../platsuppslagAPIKey.js");
const express = require('express')
const fetch = require("node-fetch")
const app = express()
const port = 5000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/selectDestinationTime', (req, res) => {
    console.log(req.query);
    let urlParams = "";
    for (let key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            if(req.query[key] !== undefined)
                urlParams += "&" + key + "=" + req.query[key]
        }
    }
    fetch("https://api.sl.se/api2/TravelplannerV3_1/trip.json?" + urlParams)
        .then(res => res.json())
        .then(json => {
            res.send(json)
    });
})

app.get('/searchStation', (req, res) => {
    console.log(req.query);
    let requestURL = "https://api.sl.se/api2/typeahead.json?key=" + key.key + "&searchstring=" + req.query.searchWord;
    fetch(requestURL)
        .then(res => res.json())
        .then(json => {
            res.send(json)
    });
})



app.listen(port, () => console.log(`Listening on port ${port}!`))
