const db = require("./db")
const data = require("./my_quotes.json")

async function initDB() {
    await db.sequelize.sync({force: true})
    
    // await db.model.Signification.create({
    //     message: "Une main de fer dans un gant de velours... Votre caractère bien trempé vous cause parfois du tort, mais pas question de vous adoucir : vous êtes comme vous êtes, que ça plaise ou non ! Au moins, vous avez le mérite de jouer cartes sur table. Vos amis savent qu'ils peuvent compter sur votre loyauté.",
    //     nombre: 1,
    // })

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