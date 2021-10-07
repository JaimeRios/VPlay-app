const express = require('express')
const Video = require('../models/video')
const router = new express.Router()

router.get('/video', async(req, res)=>{
    //const video = new Video(req.body);
    res.status(200).send('All is ok!');

})

router.post('/video', async(req,res)=>{
    const video = new Video(req.body);
    console.log(req.body)
    try{
        await video.save()
        res.status(201).send({video});
    }catch(e){
        res.status(400).send(e);
    }
})
module.exports = router