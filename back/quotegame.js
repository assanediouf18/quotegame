function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

module.exports = {
    randomId: getRandomInt,
}