"use strict";

const Server = require("./server");

Server.start(4000, function(err) {
    if(err) console.log("Server failed to start.");
})