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
const client = new VoximplantApiClient(
  {
  account_email: process.env.ACCOUNT_EMAIL,
  account_id: process.env.ACCOUNT_ID,
  key_id: process.env.KEY_ID,
  private_key: process.env.PRIVATE_KEY,
}
);

const secret =
  "61E59E2084A97A210E20F58977490DC6931DE1296EBA5F7508A305A35A5B7A1D";

router.get("/token", (req, res) => {
  const token = jwt.sign({ name: req.body.name }, secret);
  res.status(200).json({ message: token }), res.send("Hello World");
});

router.get("/createRoom", (req, res) => {
  client.onReady = function () {
    var data = {
      userName: "Gordon",
      userDisplayName: "Gordon",
      userPassword: "1234567",
      applicationId: "10464912",
    };
    // Add a new user.
    client.Users.addUser({
      userName: req.body.userName,
      userDisplayName: req.body.userDisplayName,
      userPassword: req.body.userPassword,
      applicationId: req.body.application,
    })
      .then(
        (ev) => (
          res.status(200).json({ message: ev }),
          res.send("Done" + JSON.stringify(ev))
        )
      )
      .catch((err) => res.json({ message: err }));
  };
});
router.get("./", (req, res) => {
  res.json({ hey: "Welcome to Quiver API" });
});

app.use("/", router);
module.exports.handler = serverless(app);
