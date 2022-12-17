function onProposalClick(proposal) {
    quote = sessionStorage.getItem("quote")
    score = sessionStorage.getItem("score") || "0"
    fetch('/check_answer?proposal=' + proposal + "&quote=" + quote + "&score=" + score)
        .then((response) => response.json())
        .then((data) => {
            score = data.newScore
            storeItem("score", score)
            message = (data.correct) ? "Bravo ! Ton score passe à " : "Et non c'était '" + data.answer + "', ton score reste à "
            message += score
            document.querySelector("#random_quote").innerHTML = message
            document.querySelector("#proposals").innerHTML = "<li onclick=\"getNewQuote()\">Suivant</li>"
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
                const index = movie
                li.addEventListener("click", (event) => {
                    onProposalClick(movies[index])
                })
                ul.appendChild(li)
            }
        })
}

function getNewQuote() {
    fetch('/random')
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('#random_quote').textContent = data.quote
            storeItem("quote", data.id)
            setNewProposition(data.movie)
            document.querySelector("#proposals").innerHTML = ""
        })
}

function storeItem(key, value) {
    sessionStorage.setItem(key, value);
}

getNewQuote()
storeItem("score", 0)