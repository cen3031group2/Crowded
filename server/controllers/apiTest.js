const request = require('request');
const config = require("../config/config");

const options = {
    baseUrl: 'https://api.internationalshowtimes.com/v4/',
    method: 'GET',
    json: true,
    headers: {
        "X-API-Key": config.internationalshowtimes.key
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info.stargazers_count + " Stars");
        console.log(info.forks_count + " Forks");
    }
}

request(options, callback);