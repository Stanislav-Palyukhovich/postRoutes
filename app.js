const express = require("express");
const fs = require("fs");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

var https = require('https');


jsonObject = JSON.stringify({
    "Number": "cv30001-2",
    "Id": "10000345",
    "Date": "2021-27-05",
    "Type": "0",
    "ShipperId": "357",
    "Shipper": "Sanitex",
    "DepotId": "1",
    "Depot": "9 Riverside, Salford M7 1PA",
    "ClientId": "247",
    "Client": "Maxima",
    "AddressId": "13587",
    "Address": "2 St Josephs Crescent, Liverpool L3 3JF",
    "AddressLat": "25.290479",
    "AddressLon": "65.294049",
    "AddressZone": "Zone 1",
    "TimeSlotFrom": "2019-02-01T09:00:00",
    "TimeSlotTo": "2019-02-01T18:00:00",
    "ServiceTime": "10",
    "Note": "Only to sign Invoice",
    "ContactName": "John Doe",
    "Phone": "+37061191244",
    "Email": "X-604@maxima.com",
    "Weight": "50.5",
    "Volume": "8.54",
    "Pallets": "3.5",
    "COD": "20.45",
    "InvoiceId": "inv0002",
    "CustomerReferenceId": "ord123/1",
    "Barcode": "1234567890123",
    "GoodsList": [
      {
        "OrderLineId": "22435324",
        "GoodsId": "30495",
        "GoodsName": "Some big mystic box",
        "GoodsUnit": "pcs.",
        "Note": "ID3658AAA",
        "Quantity": "10.5",
        "Cost": "2.99",
        "OrderLineBarcode": "1234567890123",
        "GoodsBarcode": "1234567890123"
      }
    ],
    "CustomFields": [
      {
        "Id": "cf_456",
        "Value": "string"
      }
    ]
  })

  // prepare the header
var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8'),
    'X-API-KEY': "61201a3a-83d7-4701-87e4-43094f8d17f1"
};

var optionspost = {
    //host : 'graph.facebook.com',
    port : process.env.PORT || 3000,
    path : 'https://api.track-pod.com/Order',
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



//add the router
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("Server is listening on port 3000");
});