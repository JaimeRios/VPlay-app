const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    keyWord :{
        type: String,
        required: true,
        trim: true
    },
    likes: {
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Number of like must be a positive number')
            }
        }
    },
    views:{
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Number of views must be a positive number')
            }
        }
    },
    data:{
        type: Buffer
    }
},{
    timestamps: true
})

const Video = mongoose.model('Video', videoSchema)

module.exports = Video