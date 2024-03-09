const path = require('path')

const express = require('express')
const app = express()

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const quotegame = require('./back/quotegame');
const db = require("./db")

const quoteNb = 3522

async function getRandomMovies() {
    movies = []
    for(i = 0; i < 4; i++) {
        id = quotegame.randomId(quoteNb)
        data = await db.model.Quote.findByPk(id)
        movies.push(data.movie)
    }
    return movies
}

app.use("/static", express.static(path.join(__dirname, '/static')))

app.get('/', (req, res) => {
    res.redirect(301, '/static/index.html')
})

app.get('/random', (req, res) => {
    id = quotegame.randomId(quoteNb)
    db.model.Quote.findByPk(id).then((data) => {
        res.json({
            quote: data.quote,
            movie: data.movie,
            id: id
        })
    })
})

app.get('/random_movies', (req, res) => {
    goodName = req.query.movie || "Film mystère"
    getRandomMovies().then((data) => {
        myMovies = []
        for(id in data)
        {
            myMovies.push(data[id])
        }
        myMovies.push(goodName)
        myMovies = quotegame.shuffle(myMovies)
        res.json({
            movies: myMovies
        })
    })
})

app.get('/check_answer', (req, res) => {
    proposal = req.query.proposal
    quoteID = parseInt(req.query.quote)
    score = parseInt(req.query.score)
    turnNb = parseInt(req.query.quoteNb)
    db.model.Quote.findByPk(quoteID).then((data) => {
        isGoodAnswer = (data.movie === proposal)
        res.json({
            correct: isGoodAnswer,
            answer: data.movie,
            newScore: score + (isGoodAnswer ? 10 : 0),
            quoteNb: 1 + turnNb
        })
    })
})

app.use(function (req, res) {
    console.log("et c'est le 404 : " + req.url);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    res.end("");

})

app.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);