const {curly} = require('node-libcurl');

function match(hostname, ip, port, https = false) {
    const url = `${https ? 'https' : 'http'}://${hostname}:${port}`;
    return curly(
        url,
        {
            resolve : `${hostname}:${port}:${ip}`
        }
    );
}

module.exports = match;
