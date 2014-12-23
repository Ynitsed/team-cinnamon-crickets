var express = require('express');
var router = express.Router();
var db = require('cookupsdb');
// get ingredients
var request = require("request")

var id_string= "_app_id=4667a454";
var key_string="_app_key=19e631ca5cc3f554227ff9ee8bc5c753";
var id_key=id_string+"&"+key_string;
var ingredient_url="http://api.yummly.com/v1/api/metadata/ingredient?"+id_key;
var ingredients=[];
request({
    url: ingredient_url,
    json: true
}, function (error, response, body) {
	if (!error && response.statusCode === 200) {
        
        var startingIndex=body.indexOf('[{');
		console.log(startingIndex);
		var endingIndex=body.indexOf(");");
		console.log(endingIndex);
		var info =JSON.parse(body.substring(startingIndex,endingIndex));
    	console.log(info);
    	var i=0;
        var len = info.length;
        console.log(len);
        for (i = 0 ; i < len; i++){
        	ingredients.push(info[i].searchValue);
        }
    }
})

router.get('/results', function(req, res){
	if(req.body){
		db.search(req.body, function(err, results){
			if(err) res.render('searcherror.ejs', { title : 'Search Results',
								message : err })
			res.render('searchresults.ejs', { title : 'Search Results' 
			
			});				
		});
	}
	else{
		res.redirect('/');
	}
});

router.get('/addrecipe', function(req, res) {
  res.render("dbaddrecipe.ejs", { title: 'Cookups: add a new recipe ' , ingredients: ingredients});
});

router.get('/recipe', function(req, res){

});

module.exports = router;
