const { application } = require('express')
const express = require('express')
const multer = require('multer')
const Video = require('../models/video')
const router = new express.Router()

router.get('/video/test', async(req, res)=>{
    res.status(200).send('All is ok!');
})



var storage = multer.diskStorage({
    destination: function (request, file, callback){
        callback(null, './public/uploads');
    }, 
    filename: function(request, file, callback){
        console.log(file); 
        callback(null, file.originalname)
    }
}); 

const upload = multer({
    storage,
    limits:{
        fileSize: 100000000
    },
    fileFilter(req, file, cb){
        console.log(file.originalname);

        if(!file.originalname.match(/\.(mp4|vid)$/)){
            return cb(new Error('Please upload a video'))
        }

        cb(undefined, true)
    }
})

router.post('/video/upload', upload.single('video'), async(req, res)=>{
    console.log(req.file)
    res.send()
},(error, req, res, next)=>{
    res.status(400).send({error: error.message})
})

router.post('/video', upload.single('video'), async(req,res)=>{
    const video = new Video(req.body);
    const videoName = req.file.originalname;
     
    if(!videoName){
        res.status(400).send('No video loaded!')
    }

    video.name = videoName;
    console.log(req.body)
    try{
        await video.save()
        res.status(201).send({video});
    }catch(e){
        res.status(400).send(e);
    }
})

router.patch('/video/like/:id', async(req, res)=>{
    const like = req.body.like;
    if(!like){
        return res.status(400).send();
    }

    try{
        const video = await Video.findOne({_id:req.params.id});
        
        if(!video){
            return res.status(404).send();
        }

        if(like === true){
            video.likes++;
        }
        else{
            if(video.likes>0)
                video.likes--;
        }

        await video.save();
        res.send(video)
        
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/video', async(req, res)=>{
    const title = req.body.title;
    const keyWord = req.body.keyWord;
    
    if(!title && !keyWord){
        return res.status(400).send();
    }

    try{
        if((title && title !== "")&&(keyWord && keyWord!=="")){
            const query = {title : {"$regex": title},keyWord: {"$regex": keyWord} }
            const videos = await Video.find(query);
            res.send(videos)
        }
        else if(title && title !== ""){
            const query = {title : {"$regex": title} }
            const videos = await Video.find(query);
            res.send(videos)
        }
        else if(keyWord && keyWord!==""){
            const query = {keyWord: {"$regex": keyWord} }
            const videos = await Video.find(query);
            res.send(videos)
        }
        else{
            res.status(404).send()
        }
        
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/video/download', async(req, res)=>{
    console.log(__dirname);
    const file = `${__dirname}../../../public/uploads/serenata.mp4`;
    res.download(file); // Set disposition and send it.
    //res.status(200).send('All is ok!');
})
module.exports = router