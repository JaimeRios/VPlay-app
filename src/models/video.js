const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    data:{
        type: Buffer
    }
},{
    timestamps: true
})

const Video = mongoose.model('Video', videoSchema)

module.exports = Video