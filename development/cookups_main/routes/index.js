var express = require('express');
var router = express.Router();
var db = require('cookupsdb');
var fs = require('fs');
// get ingredients
var request = require("request")

var ingredients;
fs.readFile('ingredients.json', {encoding:'utf8'}, function(err,data){
  if(err) throw err;
  ingredients = JSON.parse(data);
});

/*
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
*/

/* GET home page. */
router.get('/', function(req, res) {
  var user = req.session.user;
  if(!user){
    res.render('index.html', { title : 'Cookups'});
  }
  else{
    res.render('index.html', { title : 'Cookups',
                               uid : user.uid,
                               uname : user.uname });
  }
});

router.get('/about', function(req, res){
  var user = req.session.user;
  if(!user){
    res.render('about.html', { title : 'Cookups'});
  }
  else{
    res.render('about.html', { title : 'Cookups',
                               uid : user.uid,
                               uname : user.uname });
  }
});

router.get('/profile', function(req,res){
	res.redirect('/user');
});


/* GET home page. */
router.get('/search', function(req, res) {
  res.redirect('/form');
});

/* GET home page. */
router.get('/search_html', function(req, res) {
  res.render('search_index.html');
});

/* GET home page. */
router.get('/form_mina/:search_param', function(req, res) {
  console.log("in form search param");
  var url=req.url;
  var search_string = url.substring(url.indexOf("/form/")+6);
console.log(JSON.parse(req.query));
return;
/*
  try{
    db.search(search_string, function(error, recipes) {
        if (error) {
          console.log(error)
          res.render('search_results.ejs', { title          : 'Cookups' , 
                                             search_string  : search_string});
        }
        else {
          var dbrecipes = JSON.stringify(dbrecipes);
          res.render('search_results.ejs', { title          : 'Cookups' , 
                                             search_string  : search_string,
                                             dbrecipes      : dbrecipes});
        }
      });
  }
  catch(e){
    console.log(e.message);
    res.render('search_results.ejs', { title          : 'Cookups' , 
                                       search_string  : search_string});
  }
*/
});

/* GET home page. */
router.get('/form_mina', function(req, res) {
  res.render('form.ejs', { title: 'Cookups' , ingredients: ingredients});
});

/* GET home page. */
router.get('/form', function(req, res) {
  res.render('form3.ejs', { title: 'Cookups' , ingredients: ingredients});
});

router.get('/form3', function(req, res) {
  res.render('form2.ejs', { title: 'Cookups' , ingredients: ingredients});
});

router.get('/formreq', function(req, res) {

if(req.query.savedquery){
	 req.query = JSON.parse(req.query.savedquery);

}
  var initArray = [];
if(req.query.sweetmin){
  var query = {allowedIngredient  : initArray.concat(req.query.allowedIngredient),
               timehour           : parseFloat(req.query.timehour),
               timeminute         : parseFloat(req.query.timeminute),
               flavor             : {sweet  : {min : parseFloat(req.query.sweetmin),
                                               max : parseFloat(req.query.sweetmax)},
                                     meaty  : {min : parseFloat(req.query.meatymin),
                                               max : parseFloat(req.query.meatymax)},
                                     sour   : {min : parseFloat(req.query.sourmin),
                                               max : parseFloat(req.query.sourmax)},
                                     bitter : {min : parseFloat(req.query.bittermin),
                                               max : parseFloat(req.query.bittermax)},
                                     salty  : {min : parseFloat(req.query.saltymin),
                                               max : parseFloat(req.query.saltymax)}},
               kcal               : {min    : parseFloat(req.query.kcalmin),
                                     max    : parseFloat(req.query.kcalmax)},
		maxResult	: req.query.maxResult,
		start		: req.query.start
		};
}else{
  var query = req.query;
}
  try{
    db.search(query, function(error, dbrecipes, updatedquery) {
       if (error) {
          console.log(error)
	  console.log('error happened0--=-=-==-');
          res.render('listrecipes.ejs', { title          : 'Cookups' , 
                                        message        : error
	  });
        }
        else {
          res.render('listrecipes.ejs', { title	: 'Cookups' , 
                                        message	: 'Search Successful!',
                                        recs	: dbrecipes,
					query	: updatedquery 
	  });
	}
      });
  }
  catch(e){
    console.log(e.message);
    res.render('search_results.ejs', { title          : 'Cookups' , 
                                       message        : 'Critical Error: Search Failed!'});
  }
});




/*
  search_results.ejs should splash the variable message

  search_results.ejs should iterate through the variable recipes(if defined)
  and print the recipe titles, and make them hyperlinks. 
    -yummly recipes will need the hyperlink to be <yummly recipe url> with <recipe id> appended
    -local db recipes will need the hyperlink to redirect to /recipes/view/<rid>
*/
router.post('/formreq', function(req, res) {
  var initArray = [];
  var query = {allowedIngredient  : initArray.concat(req.body.allowedIngredient),
               timehour           : parseFloat(req.body.timehour),
               timeminute         : parseFloat(req.body.timeminute),
               flavor             : {sweet  : {min : parseFloat(req.body.sweetmin),
                                               max : parseFloat(req.body.sweetmax)},
                                     meaty  : {min : parseFloat(req.body.meatymin),
                                               max : parseFloat(req.body.meatymax)},
                                     sour   : {min : parseFloat(req.body.sourmin),
                                               max : parseFloat(req.body.sourmax)},
                                     bitter : {min : parseFloat(req.body.bittermin),
                                               max : parseFloat(req.body.bittermax)},
                                     salty  : {min : parseFloat(req.body.saltymin),
                                               max : parseFloat(req.body.saltymax)}},
               kcal               : {min    : parseFloat(req.body.kcalmin),
                                     max    : parseFloat(req.body.kcalmax)}};
  console.log(query);
  try{
    db.search(query, function(error, dbrecipes) {
        if (error) {
          console.log(error)
	  console.log('error happened0--=-=-==-');
          res.render('listrecipes.ejs', { title          : 'Cookups' , 
                                             message        : error});
        }
        else {
          res.render('listrecipes.ejs', { title        :	 'Cookups' , 
                                             message   :	 'Search Successful!',
                                             recs      :	dbrecipes
				});
        }
      });
  }
  catch(e){
    console.log(e.message);
    res.render('search_results.ejs', { title          : 'Cookups' , 
                                       message        : 'Critical Error: Search Failed!'});
  }
});

// GET home page.
// router.get('/search_results', function(req, res) {
//   res.render('search_results.ejs', { title: 'Cookups' , data: data});
// });

var EQD = function encodeQueryData(data)
{
   var ret = [];
   for (var d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
   return ret.join("&");
}

module.exports = router;
