var express = require('express');
var router = express.Router();

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
        	// console.log("ingredient number: "+i+" is "+info[i].searchValue);
        }
    }
    console.log(ingredients);
})
// end get ingredients


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.html', { title: 'Cookups' });
});

router.get('/about', function(req, res){
  res.render('about.html', { title: 'Cookups'});
});

router.get('/contact', function(req, res){
  res.render('contact.html', { title: 'Cookups'});
});

/* GET home page. */
router.get('/search', function(req, res) {
  res.render('search');
});

/* GET home page. */
router.get('/search_html', function(req, res) {
  res.render('search_index.html');
});

/* GET home page. */
router.get('/form/:search_param', function(req, res) {
  console.log("in form search param");
  var url=req.url;
  var search_string=url.substring(url.indexOf("/form/")+6)
  console.log("this: "+search_string);
  res.render('search_results.ejs', { title: 'Cookups' , search_string: search_string});
});

/* GET home page. */
router.get('/form', function(req, res) {
	console.log(ingredients);
  res.render('form.ejs', { title: 'Cookups' , ingredients: ingredients});
});

/* GET home page. */
router.get('/search_results', function(req, res) {
  res.render('search_results.ejs', { title: 'Cookups' , data: data});
});

module.exports = router;
