var URLToRegex = function(url) {
    var output = url.replace(new RegExp('/', 'g'), '\\/')
        .replace(new RegExp('{num}', 'g'), '[0-9]+')
        .replace(new RegExp('{alnum}', 'g'), '[a-z0-9]+')
        .replace(new RegExp('{alpha}', 'g'), '[a-z]+')

    return '^' + output + '$';
}

module.exports = {URLToRegex};