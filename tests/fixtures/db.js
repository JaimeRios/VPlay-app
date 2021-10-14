const mongoose = require('mongoose')
const Video = require('../../src/models/video')

const videoOneId = new mongoose.Types.ObjectId()
const videoOne = {
    _id: videoOneId,
    name: "",
    title: "vacaciones de verano",
    keyWord: "vacaciones playa familia"
}

const videoTwoId = new mongoose.Types.ObjectId()
const videoTwo = {
    _id: videoTwoId,
    name: "",
    title: "fiesta de grados",
    keyWord: "celebracion logros amigos"
}

const setupDatabase = async () =>{
    await Video.deleteMany();
    await new Video(videoOne).save();
    await new Video(videoTwo).save();
}

module.exports = {
    videoOneId,
    videoOne,
    videoTwoId,
    videoTwo,
    setupDatabase
}