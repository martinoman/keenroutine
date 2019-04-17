// const key = require("../platsuppslagAPIKey.js");
const dotenv = require('dotenv')
const express = require('express')
const fetch = require("node-fetch")
const path = require('path');
const app = express()
const port = process.env.PORT || 5000;

dotenv.config(); // seys up the env variables

//Static file declaration
//Vet inte vrf man behöver denna, kan nog tas bort
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
    console.log("Bajs från SERVER: production mode1");
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('/searchStation', (req, res) => {
      let requestURL = "https://api.sl.se/api2/typeahead.json?key=" + process.env.REACT_APP_PlatsuppslagAPI + "&searchstring=" + req.query.searchWord;
      fetch(requestURL)
          .then(res => res.json())
          .then(json => {
              res.send(json)
      });
  })

  app.get('/selectDestinationTime', (req, res) => {
      let urlParams = "";
      for (let key in req.query) {
          if (req.query.hasOwnProperty(key)) {
              if(req.query[key] !== undefined)
              urlParams += "&" + key + "=" + req.query[key]
          }
      }
      fetch("https://api.sl.se/api2/TravelplannerV3_1/trip.json?key=" + process.env.REACT_APP_ReseplanerareAPI + urlParams)
      .then(res => res.json())
      .then(json => {
          console.log("select destination");
          console.log(json);
          res.send(json)
      });
  })

  app.get('/getRealTimeInfo', (req, res) => {
    let urlParams = "";
    for (let key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            if(req.query[key] !== undefined)
                urlParams += "&" + key + "=" + req.query[key]
        }
    }
    urlParams = urlParams.substr(1); //This api can't handle a '&' at the beginning of the params
    fetch("https://api.sl.se/api2/realtimedeparturesV4.json?key=" + process.env.REACT_APP_realtidsinfoAPIKey + "&" + urlParams)
        .then(res => res.json())
        .then(json => {
            res.send(json)
    });
  })

  app.get('*', (req, res) => {
      console.log("Från catchall prodmode");
      console.log(__dirname);
      console.log(path.join(__dirname + 'client/build/index.html'));
      console.log(path.join(__dirname, 'client/build/index.html'));
      res.sendFile(path.join(__dirname, 'client/build/index.html'));
  })

}else {
    //build modeAAAAAAAAAAAAAA_A_A_A_A_A_A_A_A_A_A_A__A_AA__A_A_A_A_A_A_A_A__A_A_A_A_AA_A__A__A
    app.get('/searchStation', (req, res) => {
        let requestURL = "https://api.sl.se/api2/typeahead.json?key=" + process.env.REACT_APP_PlatsuppslagAPI + "&searchstring=" + req.query.searchWord;
        fetch(requestURL)
        .then(res => res.json())
        .then(json => {
            res.send(json)
        });
    })

    app.get('/selectDestinationTime', (req, res) => {
        let urlParams = "";
        for (let key in req.query) {
            if (req.query.hasOwnProperty(key)) {
                if(req.query[key] !== undefined)
                urlParams += "&" + key + "=" + req.query[key]
            }
        }
        fetch("https://api.sl.se/api2/TravelplannerV3_1/trip.json?key=" + process.env.REACT_APP_ReseplanerareAPI + "&" + urlParams)
        .then(res => res.json())
        .then(json => {
            res.send(json)
        });
    })

    app.get('/getRealTimeInfo', (req, res) => {
        let urlParams = "";
        for (let key in req.query) {
            if (req.query.hasOwnProperty(key)) {
                if(req.query[key] !== undefined)
                urlParams += "&" + key + "=" + req.query[key]
            }
        }
        urlParams = urlParams.substr(1); //This api can't handle a '&' at the beginning of the params
        fetch("https://api.sl.se/api2/realtimedeparturesV4.json?key=" + process.env.REACT_APP_realtidsinfoAPIKey + "&" + urlParams)
        .then(res => res.json())
        .then(json => {
            res.send(json)
        });
    })

    app.get('*', (req, res) => {
        res.send(path.join(__dirname+'/client/public/index.html'));
    })
}

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})
