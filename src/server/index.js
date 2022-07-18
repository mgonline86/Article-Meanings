var path = require('path')
const express = require('express')
const fetch = require('node-fetch')
const dotenv = require('dotenv')
dotenv.config();

const app = express()

app.use(express.static('dist'))
app.use(express.json({extended:false}))

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

//Integrating with Meanin Cloud API
app.post('/apiKey', function (req, res) {
    let txt = req.body.txt;
    let type = req.body.type;
    let param ={} ;
    switch (type) {
            case "url":
                 // check what text was put into the form field
                 param = {
                                url: txt,
                                lang: "auto",
                                key: process.env.API_KEY
                            };
              break;
            case "txt":
                 // check what text was put into the form field
                 param = {
                                txt: txt,
                                lang: "auto",
                                key: process.env.API_KEY
                            };
          }

    let urlSuffix = Object.keys(param).map(key => `${key}=${param[key]}`).join('&');
     console.log("before fetch");
     console.log(`https://api.meaningcloud.com/sentiment-2.1?${urlSuffix}`);
    fetch(`https://api.meaningcloud.com/sentiment-2.1?${urlSuffix}`, {
        method: 'POST',
        body: JSON.stringify(param),
        headers: { 'Content-Type': 'application/json' }
    }).then(data => {
        console.log("after fetch");
        console.log(data);
        return data.json()
    })
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err));
})
