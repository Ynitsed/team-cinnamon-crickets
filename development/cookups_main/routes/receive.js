var request = require("request")
function input_url(url){
request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body); // Print the json response
    }
})
}