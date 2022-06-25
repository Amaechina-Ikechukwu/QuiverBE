const express = require("express");
const app = express();
const ngrok = require("ngrok");
const server = require("http").Server(app);
var cors = require("cors");
const port = 5000;
const serverless = require("serverless-http");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const VoximplantApiClient = require("@voximplant/apiclient-nodejs").default;

const client = new VoximplantApiClient();

const secret =
  "61E59E2084A97A210E20F58977490DC6931DE1296EBA5F7508A305A35A5B7A1D";

router.get("/token", (req, res) => {
  const token = jwt.sign({ name: req.body.name }, secret);
  res.status(200).json({ message: token }), res.send("Hello World");
});

router.get("/createRoom", (req, res) => {
  console.log(JSON.stringify(req.query.userName), "body");
  client.onReady = function () {
    var data = {
      userName: `${req.query.userName}`,
      userDisplayName: `${req.query.userDisplayName}`,
      userPassword: ` ${req.query.userPassword}`,
      applicationId: 10464912,
    };
    var dataa = {
      userName: "Gordonybsbs",
      userDisplayName: "Gordonyhsjs",
      userPassword: "1234567",
      applicationId: "10464912",
    };
    // Add a new user.
    try {
      client.Users.addUser(data)
        .then((ev) => console.log(ev))
        .catch((err) => console.log(err, "catch err"), res.json("done"));
    } catch (e) {
      console.log("catch", e);
    }
  };
});
router.get("/", (req, res) => {
  res.json({ hey: "Welcome to Quiver API" });
});

app.use("/", router);
module.exports.handler = serverless(app);
