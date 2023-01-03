proposed = false

function onProposalClick(proposal) {
    proposed = true
    quote = sessionStorage.getItem("quote")
    score = sessionStorage.getItem("score") || "0"
    quoteNb = sessionStorage.getItem("quoteNb") || "1"
    fetch('/check_answer?proposal=' + proposal + "&quote=" + quote + "&score=" + score + "&quoteNb=" + quoteNb)
        .then((response) => response.json())
        .then((data) => {
            score = data.newScore
            storeItem("score", score)
            quoteNb = parseInt(data.quoteNb)
            storeItem("quoteNb", quoteNb)
            message = (data.correct) ? "Bravo ! Ton score passe à " : "Et non c'était '" + data.answer + "', ton score reste à "
            message += score + " (il reste " + (10 - quoteNb).toString() + " tour(s))"
            document.querySelector("#random_quote").innerHTML = message
            goToNextMessage = "<li onclick=\"getNewQuote()\">Suivant</li>"
            endMessage = "<a href=\"end.html\">Fin</a>"
            document.querySelector("#proposals").innerHTML = (quoteNb == 10) ? endMessage : goToNextMessage
        })
}

function setNewProposition(goodMovie) {
    fetch('/random_movies?movie=' + goodMovie)
        .then((response) => response.json())
        .then((data) => {
            movies = data.movies
            ul = document.querySelector("#proposals")
            for(movie in movies) {
                li = document.createElement("li")
                li.textContent = movies[movie]
                li.className = "btn btn-dark"
                const index = movie
                li.addEventListener("click", (event) => {
                    onProposalClick(movies[index])
                })
                ul.appendChild(li)
            }
        })
}

function getNewQuote() {
    proposed = false
    fetch('/random')
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('#random_quote').textContent = ""
            typeWriter(data.quote, "random_quote")
            storeItem("quote", data.id)
            setNewProposition(data.movie)
            document.querySelector("#proposals").innerHTML = ""
        })
}

function storeItem(key, value) {
    sessionStorage.setItem(key, value);
}

function typeWriter(txt, id, i = 0) {
    speed = 30
    if (i < txt.length) {
      document.getElementById(id).innerHTML += txt.charAt(i);
      i++;
      if(!proposed) {
        setTimeout(() => {typeWriter(txt, id, i)}, speed)
      }
    }
}

getNewQuote()
storeItem("score", 0)
storeItem("quoteNb", 0)