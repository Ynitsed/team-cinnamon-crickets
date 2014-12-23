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

router.get('/addrecipe', function(req,res){
  var user = req.session.user;
  var recipeauthmessage = req.flash('recipe_auth') ;

  if(!user){
    res.redirect('/');
  }
  else{
    pagetitle = user.uname + '\'s CookUps';
    res.render('addrecipe.html', { title : pagetitle,
				user : user,
				recipemessage : recipeauthmessage });
  }
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


  var newIngs = [];
  if(req.query.allowedIngredient){
    for(var i in req.query.allowedIngredient){
      if(req.query.allowedIngredient[i]){
        newIngs.push(req.query.allowedIngredient[i]);
      }
    }
  }

if(req.query.sweetmin){
  var query = {	/* allowedIngredient  : initArray.concat(req.query.allowedIngredient),*/
               // allowedCuisine     : initArray.concat(req.query.allowedCuisine),
               // allowedHoliday     : initArray.concat(req.query.allowedHoliday),
               // allowedAllergy     : initArray.concat(req.query.allowedAllergy),
               // allowedDiet        : initArray.concat(req.query.allowedDiet),
               // allowedCourse      : initArray.concat(req.query.allowedCourse),
               // timehour           : parseFloat(req.query.timehour),
               // timeminute         : parseFloat(req.query.timeminute),
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
//		maxResult	: parseInt(req.query.maxResult),
		maxResult 	: 8,
		start		: req.query.start
		};

if(newIngs.length) query.allowedIngredient = newIngs;

    
	if(req.query.q !== ''){
		query.q = req.query.q;
		query.recipeName = req.query.q;
	}	

//	if(req.query.allowedIngredient)query.allowedIngredient = req.query.allowedIngredient;
	if(req.query.allowedCuisine) query.allowedCuisine = req.query.allowedCuisine;
  if(req.query.allowedHoliday) query.allowedHoliday = req.query.allowedHoliday;
  if(req.query.allowedAllergy) query.allowedAllergy = req.query.allowedAllergy;
  if(req.query.allowedDiet) quer.allowedDiet = req.query.allowedDiet;
  if(req.query.allowedCourse) query.allowedCourse = req.query.allowedCourse;
  if(req.query.timehour){ query.timehour = parseInt(req.query.timehour); } else{query.timehour = 0;}
  if(req.query.timeminute){ query.timeminute = parseInt(req.query.timeminute);} else{query.timeminute = 0}
  if(req.query.retro) query.retro = req.query.retro;

  if(query.timehour + query.timeminute){query.maxTotalTimeInSeconds = (3600 * query.timehour) + (query.timeminute * 60) }
    delete query.timehour; delete query.timeminute;
  
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
        else if(req.query.retro) {
          console.log(dbrecipes);
          res.render('listrecipes_retro.ejs', { title	: pagetitle , 
                                        message	: 'Search Successful!',
                                        recs	: dbrecipes,
                                        user : user,
				                              	query	: updatedquery 
	        });
	     }
        else {
          console.log(dbrecipes);
          res.render('listrecipes.ejs', { title : pagetitle , 
                                        message : 'Search Successful!',
                                        recs  : dbrecipes,
                                        user : user,
                                        query : updatedquery 
          });
       }
      });
  }
  catch(e){

    console.log(e.message);
    res.render('listrecipes.ejs', { title          : pagetitle , 
                                       message        : 'Critical Error: Search Failed!'});
  }
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
    var recipeauthmessage = req.flash('recipe_auth') ;
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
	var authmessage = req.flash('auth') || '';
        res.render('profile.ejs', { title : pagetitle, user : result,
					 recipes: dbrecipes,
					message : authmessage,
					recipemessage : recipeauthmessage } );
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


router.get('/editProfile', function(req, res) {


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
        res.render('editingProfile.ejs', { title : pagetitle, user : result, recipes: dbrecipes } );
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
