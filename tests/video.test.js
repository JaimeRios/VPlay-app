const request = require('supertest')
const app = require('../src/app')
const Video = require('../src/models/video')
const {videoOneId, videoOne, videoTwo, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Dar like a un video', async()=>{
    const videoBefore = await Video.findById(videoOneId);
    const likesBefore = videoBefore.likes;

    const response = await request(app).patch(`/video/like/${videoOneId}`).send({
        like: true
    }).expect(200); 

    const videoAfter = await Video.findById(videoOneId);
    const likesAfter = videoAfter.likes;
    
    expect(likesBefore+1).toBe(likesAfter)
})

test('Buscar un video', async()=>{
    const response = await request(app).get('/video').send({
        title: "vacaciones"
    }).expect(200);

    expect(response.body.length).toEqual(1);

})