const express = require("express")
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
const cors = require("cors")
const PORT = 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = "plant-app"

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        // plantsCollection = db.collection("plantsCollection")
    })
    // .catch(error => console.error(error))


app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//   })
//   .catch(error => console.error(error))

const plants = {
    "monstera": {
        "nickName": "swiss cheese plant, monstera",
        "latinName": "Monstera deliciosa",
        "plantType": "tropical",
        "petSafe": "moderately toxic"
    },
    "spider plant": {
        "nickName": "spider plant, spider ivy, ribbon plant",
        "latinName": "Chlorophytum comosum",
        "plantType": "tropical",
        "petSafe": "non-toxic"
    },
    "rubber plant": {
        "nickName": "rubber plant, Rubber fig, rubber bush, rubber tree",
        "latinName": "Ficus elastica",
        "plantType": "evergreen tropical",
        "petSafe": "mildly toxic"
    },
    "unknown": {
        "nickName": "Not yet in our database",
        "latinName": "n/a",
        "plantType": "n/a",
        "petSafe": "n/a"
    }
}

// app.get('/',(request, response)=>{
//     db.collection('rappers').find().sort({likes: -1}).toArray()
//     .then(data => {
//         response.render('index.ejs', { info: data })
//     })
//     .catch(error => console.error(error))
// })

app.get("/", (request, response) => {
    db.collection("plantsCollection").find().toArray()
        .then(result => {
            response.render("index.ejs", {plantResultInfo : result})
        })
    .catch(error => console.error(error))
    // response.sendFile(__dirname + "/index.html")
})

// app.get("/api/:name", (request, response) => {
//     const plantName = request.params.name.toLowerCase()
//     if(plants[plantName]) {
//         response.json(plants[plantName])
//     }else {
//         response.json(plants["unknown"])
//     }
// })

app.post('/addPlant', (request, response) => {
    db.collection("plantsCollection").insertOne({nickName: request.body.nickName, 
        latinName: request.body.latinName, petSafe: request.body.petSafe})
    .then(result => {
        console.log('Plant Added')
        response.redirect('/')
      })
      .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on ${PORT}.`)
})