
const fs = require('fs')
const express = require('express');
const res = require('express/lib/response');
const app = express()
const port = 3000
const cors = require("cors")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require("axios")

app.use("/css", express.static(__dirname + "/css/"))
app.use(cors())
app.use(express.json())

app.get('/', async (_, res) => {
    const indexHTML = fs.readFileSync(__dirname + "/html/index.html", "utf-8")
    res.send(indexHTML)
})

app.get("/search", async (req, res) => {

    const resultPpl = await axios.get(
        "https://swapi.dev/api/people"
    )

    const resultStarships = await axios.get(
        "https://swapi.dev/api/starships"
    )

    const resultPlanets = await axios.get(
        "https://swapi.dev/api/planets"
    )


    const results = [...resultPpl.data.results, ...resultStarships.data.results, ...resultPlanets.data.results]
    const filtered = results.filter(e => e.name.toLowerCase().includes(req.query.name.toLowerCase()))
    res.send( {results:filtered})

  });


app.get("/*", (_, res) => {
    const HTML = fs.readFileSync(__dirname + "/html/404.html", "utf-8")
    res.send(HTML)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})




