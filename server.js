"use strict";

const express = require("express"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    cors = require("cors"),
    config = require("./config");

const Server = function () {
    // connect to the database and load models
    // require("./models").connect(config.dbUri);

    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    this.app.use(cors());

    // pass the passport middleware
    this.app.use(passport.initialize());

    // // load passport strategies
    // const localSignupStrategy = require("./passport/local-signup");
    // const localLoginStrategy = require("./passport/local-login");
    // passport.use("local-signup", localSignupStrategy);
    // passport.use("local-login", localLoginStrategy);

    // // pass the authentication checker middleware
    // this.app.use("/api", require("./middleware/auth-check"));

    // // routes
    // this.app.use("/auth", require("./routes/authRoutes"));
    // this.app.use("/api", require("./routes/apiRoutes"));

    this.app.get("/", function (req, res) {
        res.end("Hello World");
    })
}

Server.prototype.start = function (port, cb) {
    this.app.listen(port, (err) => {
        if (err) {
            console.log("Server failed to start...");
            process.exit(0);
        }
        console.log("Server is running on http://localhost:" + port + " or http://127.0.0.1:" + port);
        cb();
    });
};

module.exports = new Server();