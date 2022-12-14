const path = require('path')

const express = require('express')
const app = express()

const hostname = '127.0.0.1';
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
    db.model.Quote.findByPk(quoteID).then((data) => {
        res.json({
            correct: (data.movie === proposal),
            answer: data.movie
        })
    })
})

// app.get('/roll/:unfrozen', (req, res) => {
//     var unfrozenDices = parseInt(req.params.unfrozen);
//     var dices = discus.roll(unfrozenDices);
//     res.json({
//         values: dices.dices,
//         endAttempt: dices.endAttempt,
//         disableBtn: dices.dices != [],
//     });
// })

// app.get('/freeze', (req, res) => {
//     var id = req.query.id;
//     var mClass = req.query.class;
//     var value = req.query.value;
//     var respObject = discus.freeze({id: id, value: value, class: mClass});
//     res.json(respObject);
// })

// app.get('/finish', (req, res) => {
//     var respObj = discus.finish({attemptNb: req.query.attemptNb, values: req.query.values});
//     res.json(respObj);
// })

app.use(function (req, res) {
    console.log("et c'est le 404 : " + req.url);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    res.end("");

})

app.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);