const express = require("express")
const app = express()
const PORT = 8000

const plants = {
    "monstera": {
        "nickName": "swiss cheese plant, monstera",
        "latinName": "Monstera deliciosa",
        "plantType": "tropical",
        "pet-safe": "moderately toxic"
    },
    "spider plant": {
        "nickName": "spider plant, spider ivy, ribbon plant",
        "latinName": "Chlorophytum comosum",
        "plantType": "tropical",
        "pet-safe": "non-toxic"
    },
    "rubber plant": {
        "nickName": "rubber plant, Rubber fig, rubber bush, rubber tree",
        "latinName": "Ficus elastica",
        "plantType": "evergreen tropical",
        "pet-safe": "mildly toxic"
    },
    "unknown": {
        "nickName": "Not yet in our database",
        "latinName": "n/a",
        "plantType": "n/a",
        "pet-safe": "n/a"
    }
}

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html")
})

app.get("/api/:name", (request, response) => {
    const plantName = request.params.name.toLowerCase()
    if(plants[plantName]) {
        response.json(plants[plantName])
    }else {
        response.json(plants["unknown"])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on ${PORT}.`)
})