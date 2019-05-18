const express = require("express")
const router = express.Router()
const admin = require("firebase-admin")
const serviceAccount = require("../dev-account-a5b76-firebase-adminsdk-7zfr0-8f998b9e6f.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dev-account-a5b76.firebaseio.com"
  });
module.exports = router