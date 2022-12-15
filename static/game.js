function onProposalClick(proposal) {
    quote = sessionStorage.getItem("quote")
    fetch('/check_answer?proposal=' + proposal + "&quote=" + quote)
        .then((response) => response.json())
        .then((data) => {
            message = (data.correct) ? "Bravo !" : "Et non c'était '" + data.answer + "'"
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
        })
        document.querySelector("#proposals").innerHTML = ""
}

function storeItem(key, value) {
    sessionStorage.setItem(key, value);
}

getNewQuote()