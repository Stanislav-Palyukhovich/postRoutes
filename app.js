const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

var https = require('https');

var key;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.post("/api/route", function(req, res) {

    {
        /*jsonObject = JSON.stringify({
            "Code": "R01",
            "Id": "01",
            "Date": "2021-05-28",
            "DepotId": "1",
            "Depot": "19 Riverside, Salford M7 1PA",
            "DriverLogin": "B",
            "DriverPassword": "B",
            "DriverName": "Bob",
            "DriverVehicle": "Red Ford",
          })*/

          jsonObject = JSON.stringify(req.body.value.route);
          console.log(jsonObject);

        
          // prepare the header
        var postheaders = {
            'Content-Type' : 'application/json',
            'Content-Length' : Buffer.byteLength(jsonObject, 'utf8'),
            'X-API-KEY': req.body.value.key
        };
        
        var optionspost = {
            host : 'api.track-pod.com',
            port : 443,
            path : '/Route',
            method : 'POST',
            headers : postheaders,
        };
        
        // do the POST call
        var reqPost = https.request(optionspost, function(res) {
            console.log("statusCode: ", res.statusCode);
            // uncomment it for header details
        //  console.log("headers: ", res.headers);
        
            res.on('data', function(d) {
                console.info('POST result:\n');
                process.stdout.write(d);
                console.info('\n\nPOST completed');
            });
        });
        
        // write the json data
        reqPost.write(jsonObject);
        reqPost.end();
        reqPost.on('error', function(e) {
            console.error(e);
        });
    }
    
    
    res.send({"status":res.statusCode});

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("Server is listening on port 3000");
});