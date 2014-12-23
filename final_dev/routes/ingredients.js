var request = require("request")

var id_string= "_app_id=4667a454";
var key_string="_app_key=19e631ca5cc3f554227ff9ee8bc5c753";
var id_key=id_string+"&"+key_string;
var ingredient_url="http://api.yummly.com/v1/api/metadata/ingredient?"+id_key;

request({
    url: ingredient_url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
    }
})