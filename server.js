const express = require("express")
const app = express()
const MongoClient = require('mongodb').MongoClient
// const bodyParser= require('body-parser')
// const cors = require("cors")
const PORT = 8000
require('dotenv').config()



let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'plant-app'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('plantsCollection').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addPlant', (request, response) => {
    db.collection('plantsCollection').insertOne({nickName: request.body.nickName,
    latinName: request.body.latinName, petSafe: request.body.petSafe, likes: 0})
    .then(result => {
        console.log('Plant Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('plantsCollection').updateOne({nickName: request.body.nickNameS, latinName: request.body.latinNameS, petSafe: request.body.petSafeS, likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})



app.delete('/deletePlant', (request, response) => {
    db.collection('plantsCollection').deleteOne({nickName: request.body.nickNameS})
    .then(result => {
        console.log('Plant Deleted')
        response.json('Plant Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})