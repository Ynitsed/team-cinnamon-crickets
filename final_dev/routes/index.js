var express = require('express');
var router = express.Router();
var db = require('cookupsdb');
var fs = require('fs');
// get ingredients
var request = require("request")

var pagetitle = 'CookUps'

/* GET home page. */
router.get('/', function(req, res) {
  var user = req.session.user;
  if(!user){
    pagetitle = 'CookUps'
    res.render('index.html', { title : pagetitle, user : user});
  }
  else{
    pagetitle = user.uname + '\'s CookUps';
    res.render('index.html', { title : pagetitle, user : user});
  }
});

router.get('/about', function(req, res){
  var user = req.session.user;
  if(!user){
    res.render('about.html', { title : pagetitle, user : user});
  }
  else{
  	pagetitle = user.uname + '\'s CookUps';
    res.render('about.html', { title : pagetitle, user : user});
  }
});

router.get('/test', function(req, res){
  res.render('test.ejs', { title : 'cookups'});
  
});

router.get('/profile', function(req,res){
	//res.redirect('/user');
	res.render('profile.html');
});

router.get('/addrecipe', function(req,res){
  res.render('addrecipe.html');
});


/* GET home page. */
router.get('/search', function(req, res) {
  res.redirect('/form');
});


router.get('/formreq', function(req, res) {
  var user = req.session.user;
  if(user){
    pagetitle = user.uname + '\'s CookUps';
  }

if(req.query.savedquery){
	 req.query = JSON.parse(req.query.savedquery);

}
  var initArray = [];
if(req.query.sweetmin){
  var query = {allowedIngredient  : initArray.concat(req.query.allowedIngredient),
               allowedCuisine     : initArray.concat(req.query.allowedCuisine),
               allowedHoliday     : initArray.concat(req.query.allowedHoliday),
               allowedAllergy     : initArray.concat(req.query.allowedAllergy),
               allowedDiet        : initArray.concat(req.query.allowedDiet),
               allowedCourse      : initArray.concat(req.query.allowedCourse),
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
               nutrients          : {kcal         : {min : parseFloat(req.query.kcalmin),
                                                     max : parseFloat(req.query.kcalmax)},
                                     fat          : {min : parseFloat(req.query.fatmin),
                                                     max : parseFloat(req.query.fatmax)},
                                     cholesterol  : {min : parseFloat(req.query.cholesterolmin),
                                                     max : parseFloat(req.query.cholesterolmax)},
                                     sodium       : {min : parseFloat(req.query.sodiummin),
                                                     max : parseFloat(req.query.sodiummax)},
                                     carbs        : {min : parseFloat(req.query.carbsmin),
                                                     max : parseFloat(req.query.carbsmax)},
                                     fiber        : {min : parseFloat(req.query.fibermin),
                                                     max : parseFloat(req.query.fibermax)},
                                     sugar        : {min : parseFloat(req.query.sugarmin),
                                                     max : parseFloat(req.query.sugarmax)},
                                     protein      : {min : parseFloat(req.query.proteinmin),
                                                     max : parseFloat(req.query.proteinmax)}},
               kcal         : {min : parseFloat(req.query.kcalmin),
                                                     max : parseFloat(req.query.kcalmax)},
		maxResult	: req.query.maxResult,
		start		: req.query.start
		};
    console.log(query);
}else{
  var query = req.query;
}
  try{
    db.search(query, function(error, dbrecipes, updatedquery) {
       if (error) {
          console.log(error)
	  console.log('error happened0--=-=-==-');
          res.render('listrecipes.ejs', { title          : pagetitle , 
                                        message        : error,
                                        user : user
	  });
        }
        else {
          console.log(dbrecipes);
          res.render('listrecipes_old.ejs', { title	: pagetitle , 
                                        message	: 'Search Successful!',
                                        recs	: dbrecipes,
                                        user : user,
					query	: updatedquery 
	  });
	}
      });
  }
  catch(e){
    console.log(e.message);
    res.render('search_results.ejs', { title          : pagetitle , 
                                       message        : 'Critical Error: Search Failed!'});
  }
});



router.get('/item-single.html', function(req, res) {
  res.render('item-single.html');
});


router.get('/viewProfile', function(req, res) {


  var initArray = [];
  var user = req.session.user;
  
  //console.log(query);
  

  //var user = req.session.user;
  if(!user){
    res.redirect('/user/login');
  }
  else{

    var query = {user: user.uid};
    db.getUserById(user.uid, function(error, result){
    if(error){
      delete req.session.user;
      res.redirect('/user/login');
    }
    else {
      console.log(result);
      console.log('this should still have something in it');
      
      db.getRecipesByUser(user.uid, function(error, dbrecipes) {
      if (error) {
        console.log(error)
        console.log('error happened0--=-=-==-');
      }
      else {
        console.log('the recipes are')
        console.log(dbrecipes);
        res.render('profile.ejs', { user : result, recipes: dbrecipes } );
      }
      });


      
    } 
    });

    // res.render('profile.ejs', { title : 'Profile',
    //                            uid : user.uid,
    //                            uname : user.uname,
    //                            user : user });
  }

});

var EQD = function encodeQueryData(data)
{
   var ret = [];
   for (var d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
   return ret.join("&");
}

module.exports = router;
