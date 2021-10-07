const express = require("express");
const auth = require('./middleware/auth')

console.log(process.env.REDIS_PORT)
const app = express();

app.use(express.json());
app.use('/auth/',auth)

module.exports = app;