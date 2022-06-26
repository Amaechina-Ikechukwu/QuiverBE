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
var fs = require("fs");
var path = require("path");

const VoximplantApiClient = require("@voximplant/apiclient-nodejs").default;

const secret =
  "61E59E2084A97A210E20F58977490DC6931DE1296EBA5F7508A305A35A5B7A1D";

var obj = {
  account_email: "amaechinaikechukwu6@gmail.com",
  account_id: 4696623,
  key_id: "4abdfdc3-77df-4961-ab7f-d88b4c853330",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyCPhfT/ok6EgE\nRh5agREW1f41JRNtwpLMwCipZx9YsCgMZY4w95EheOoLKWAcNOTxPuuR28iNomps\ncsr5A29Zlv5uMfkfBpC1jL9kazAcPsfnD2q+0gyOCPmWcK6pDyq8IkHfML2SJYSJ\ngAwj2WuZRgzZZDbWMqFDSqgPebzM1DzxhNkgmFXnraGpMhIIB7UyXHyZnOzW8ujP\nooCaIVyWYHJ7HebujbKvitC1ZGxq6NX9Ntt2F1rhIndq2g3Icj256aRxekwtKn7W\nYmvGMAeIY8RAYN9cc/2hY01fvnMTJEMnsqgl3h52AeUyoekbXXyosSbKcHu0yDdC\nNDOPeep3AgMBAAECggEAUJIErUXJg8hnRx/gfr7oV/hSSgTUbRjgTK8t97RGmGFo\nTmvrVLfFQ2uwJ4r7BujdL1x1SZY4hfiZxyiQOO9YBihyTrZo8qSK+s6Ok0h7Bl1X\nJHdyrJbsvZ7MLUwjjzjg8zFhtDsfn7NA7uU3GUY9DqmICR30Py28k3KG6jICwoML\nctxPV4VLOj5Cmqx2QhM0RsAKwMpoZLGTauTfx5yigAAHCgolGBwfXJrhrtQoBJaQ\nURuuS0OuE5JWw41s/OJ3Q8TAhQB5mhDP3ZRke/rUbnbPVCg/xwTuG1vY3KgftLZ3\nuNp7RdJnQ99MHQ36QjM9/k8MWszsZVumkqZwa8bNYQKBgQD0MVPA1cU9LMlLuDna\n8QlHYuyi/T9PhWftbZOaQWFF9T+U7TybYSrIoOly1pymK5a5jQ/FmjqYHBbXL9de\nhratlq42sRYiAGBVqOd7yfxuK7UZiH7Fs76Q4bDa/WxzLXnb9w5S6KCQrA1IFO1M\nNun/pB5DOq+p8jr20p7aYstVpwKBgQC6pLqF4x715cTMN/IEtkqztUfocx+Nh96V\nzdzHob4uDLb7sdQUSG/A+UzI4HKXja48PTooS8uOL020kS9od7W1qkVca/ViMm5b\nft9dHjCBZguaeWUrVXprTgwXUWceG8zxP0dy644lGIFkiKyZpTroViP8hC9GNoYA\ne5/Ie9j+sQKBgEozOunbiyV9mGUDw8C9gT5J1vHn1fcJ6HyC0VkMCMzDKuDL/aCR\nM/jmvEkC4XK0yAX10RcQOEHEN0SH6v90G8o/gQxpXvpR9vPQcRZyV9v6N/tcOHlG\nlt9bVOwWGYAeD2tBdP7IZRHQ1fBTO4/vF8dwTSnMiVgwnK4nbdGaN4L9AoGAH0DC\nMvUrFAXbhE7B6eQUci8i0Vulpu9faDpGg+8jh1Z9tXu7hYHzpJ6aKvDaf2IsEM43\n1NOMTEzDeD7vb1DMTpUqdCVnu3+yVwPRpygM+z35J264cB8qFpnFEIqC99mz4Zm0\n/xtOfAu0bv8r17aBPLJf6ELCH8G1gpMw2ENUvKECgYEApLKqrbZMp4wuRV+/Ndmg\nrh+gaHSR03VPSac6NEuUccTc0v04pU+zPCoZI4d0Hb9JVwZf8LETZc1RxK/x+W3O\n7idquhhAUlz8s/jh1NIxS1Y1dRFeR7QChoSK6kUiB4x85ueMLVeRq/ssdlW2+ez6\n/63MCYxNbvZFn+hGZ1wLwdc=\n-----END PRIVATE KEY-----\n",
};

var buf = Buffer.from(JSON.stringify(obj));

const client = new VoximplantApiClient("https://github.com/Amaechina-Ikechukwu/QuiverBE/blob/7e9e7bb6966f7243dc801855f031a8b611a75846/credentials.json#L1-L6");

router.get("/token", (req, res) => {
  const token = jwt.sign({ name: req.body.name }, secret);

  // res.sendFile(path.join(__dirname, "/public/index.html"));
  res.status(200).send(token);
  console.log("Done");
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
        .catch((err) => console.log(err, "catch err"), res.send("done"));
    } catch (e) {
      console.log("catch", e);
    }
  };
});
router.get("/", (req, res) => {
  res.send({ hey: "Welcome to Quiver API" });
});

app.use("/", router);
module.exports.handler = serverless(app);
