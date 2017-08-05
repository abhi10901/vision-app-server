"use strict";

const mongoose = require("mongoose");

module.exports.connect = (uri) => {
    mongoose.connect(uri);

    mongoose.Promise = global.Promise;

    mongoose.connection.on("error", (err) => {
        console.error(`Mongoose connectin error : ${err}`);
        process.exit(1);
    })

    require("./user");
}