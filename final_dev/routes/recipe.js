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
  Route for /recipe/create:

    addRecipe.html will be handed the following variables:
      -title
      -message
      -uid
      -uname

    addRecipe.html will need to implement a form that redirects to /recipe/add and
    provides the following variables:
      -name
      -ingredients
      -instructions
    possibly:
      -totalTime
      -servings
      -calories

    Redirects to / if user is not signed in.
*/
router.get('/create', function(req, res){

  var addmessage = req.flash('addmsg') || '';


  var user  = req.session.user;
  res.render('addrecipe.html', { title    : 'Cookups',
                                   message  : addmessage,
                                   user      : user});
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
    console.log("Name: " + req.body.name);
    console.log("Ingredients: " + req.body.ingredients);
    console.log("Instructions: " + req.body.instructions);
    console.log("TotalTime: " + req.body.totalTime);
    console.log("Servings: " + req.body.servings);
    console.log("Calories: " + req.body.calories);
    console.log("Sweet: " + req.body.sweet);
    console.log("Salty: " + req.body.salty);
    console.log("Sour: " + req.body.sour);
    console.log("Bitter: " + req.body.bitter);
    console.log("Meaty: " + req.body.meaty);
    res.redirect('/profile');
  }
  else {
    var recipe = {uid           : user.uid,
                  name          : req.body.name,              // string
                  ingredients   : req.body.ingredients,       // array
                  instructions  : req.body.instructions,      // string
                  totalTime     : req.body.totalTime,         // number in minutes
                  servings      : req.body.servings,          // number
                  calories      : req.body.calories,          // number
                  sweet         : parseFloat(req.body.sweet), // number 1-10
                  salty         : parseFloat(req.body.salty), // number 1-10
                  sour          : parseFloat(req.body.sour),  // number 1-10
                  bitter        : parseFloat(req.body.bitter), // number 1-10
                  meaty         : parseFloat(req.body.meaty)}; // number 1-10

    if(req.body.imagename){
      recipe.imagename = req.body.imagename;
    }
    db.addRecipe(recipe, function(error, success) {
      if (error) {
        console.log(error)
        res.redirect('/viewProfile');
      }
      else {
        console.log('Added: \n' + success);
        res.redirect('/viewProfile');
      }
    });
  }
});

module.exports = router;
