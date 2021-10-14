const express = require('express')
require('./db/mongoose')
const videoRouter = require('./routers/video')

const app = express()

app.use(express.json())
app.use(videoRouter);

module.exports = app