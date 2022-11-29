function onProposalClick(proposal) {
    quote = document.querySelector("#random_quote").textContent
    fetch('/check_answer?proposal=' + proposal + "&quote=" + quote)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            message = (data.correct) ? "Bravo !" : "Et non c'était " + data.answer
            document.querySelector("#proposals").innerHTML = message
        })
}

function setNewProposition(goodMovie) {
    fetch('/random_movies?movie=' + goodMovie)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.movies)
            movies = data.movies
            ul = document.querySelector("#proposals")
            for(movie in movies) {
                li = document.createElement("li")
                li.textContent = movies[movie]
                li.addEventListener("click", () => onProposalClick(movies[movie]))
                ul.appendChild(li)
            }
        })
}

function getNewQuote() {
    fetch('/random')
        .then((response) => response.json())
        .then((data) => {
            document.querySelector('#random_quote').textContent = data.quote
            setNewProposition(data.movie)
        })
}

getNewQuote()