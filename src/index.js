const express = require('express')
require('./db/mongoose')
const videoRouter = require('./routers/video')
const app = express()

app.use(express.json())
app.use(videoRouter);

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})