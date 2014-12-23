var db = require('cookupsdb');
var express = require('express');
//var url  = require('url');
var router = express.Router();

var pagetitle = 'CookUps'

/*
  Route for /recipe/view:

    recipe/view will be required to take the following fields:
      -rid

    viewRecipe.html will be required display the following fields:
      -name
      -ingredients
      -instructions

    viewRecipe.html should be able to display the following possible fields:
      -servings
      -totalTime
      -calories

    Redirects to /searchResults if recipe is unable to be retrieved.
*/
router.get('/view', function(req, res){

  var user  = req.session.user;
  var rid   = req.query.rid;
  if(user){
    pagetitle = user.uname + '\'s CookUps';
  }
  //var urlParts = url.parse(reqURL);
  //var rid   = parseInt(urlParts.pathname.substring(8, urlParts.pathname.length))

  db.getRecipeById(rid, function(error, recipe) {
      if (error) {
  console.log(error);
        res.redirect('/');
      }
      else {
        res.render('singlerecipe.ejs', {title : pagetitle,
                                        recipe : recipe,
                                        user : user } );
      }
  });

});

/*
  Route for /recipe/add:

    Form will need to provide the following variables:
      -name
      -ingredients
      -instructions
      -totalTime
      -servings
      -calories
      -sweet
      -salty
      -sour
      -bitter
      -meaty
    possibly:
      -imagename

    Redirects to / if user is not signed in or to /user/create
    with a success or error message.
*/
router.post('/add', function(req, res) {

  var user = req.session.user;

  if (user === undefined) {
    res.redirect('/viewProfile');
  }
  else {
    var recipe = {uid           : user.uid,
                  name          : req.body.name,              
                  ingredients   : JSON.parse(req.body.ingredients),      
                  instructions  : req.body.instructions,      
                  totalTime     : parseInt(req.body.totalTime)*60,         
                  servings      : parseInt(req.body.servings),          
                  calories      : parseInt(req.body.calories),          
                  sweet         : parseFloat(req.body.sweet)/10, 
                  salty         : parseFloat(req.body.salty)/10, 
                  sour          : parseFloat(req.body.sour)/10,  
                  bitter        : parseFloat(req.body.bitter)/10, 
                  meaty         : parseFloat(req.body.meaty)/10}; 

    console.log(req.files.files.path);

    
    console.log(req.files);

    if(req.body.imagename){
      recipe.imagename = req.body.imagename;
    }
	console.log(recipe);

    db.addRecipe(recipe, function(error, success) {
      if (error) {
	req.flash('recipe_auth', error);
        console.log(error)
        res.redirect('/addrecipe');
      }
      else {
	req.flash('recipe_auth', recipe.name + " has been successfully added!");
        console.log('Added RID: \n' + success.rid);
        res.redirect('/viewProfile');
      }
    });
  }
});

module.exports = router;
