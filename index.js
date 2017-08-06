"use strict";

require("dotenv").config();
const Server = require("./server");

console.log(process.env.PORT);

Server.start(process.env.PORT || 4000, function(err) {
    
    if(err) console.log("Server failed to start.");
})