const express = require("express");
const fs = require("fs");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/"));

//add the router
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("Server is listening on port 3000");
});