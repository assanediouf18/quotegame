const db = require("./db")
const data = require("./my_quotes.json")

async function initDB() {
    await db.sequelize.sync({force: true})

    for(qmovie in data)
    {
        for(quoteID in qmovie) {
            myquote = data[qmovie][quoteID]
            if(myquote != null && myquote != undefined) {
                await db.model.Quote.create({
                    quote: myquote,
                    movie: qmovie,
                })
            }
        }
    }
}

initDB()
    .then(() => {
        console.log("base initialisée")
    })