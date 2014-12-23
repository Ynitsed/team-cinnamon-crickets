var db = require('cookupsdb');
var express = require('express');
//var url  = require('url');
var router = express.Router();

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
  //var urlParts = url.parse(reqURL);
  //var rid 	= parseInt(urlParts.pathname.substring(8, urlParts.pathname.length))

  db.getRecipeById(rid, function(error, recipe) {
      if (error) {
	console.log(error);
        res.redirect('/form');
      }
      else {
        res.render('singlerecipe.ejs', { recipe : recipe } );
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

  if (user === undefined) {
    res.redirect('/');
  }
  else {
    res.render('addrecipe.html', { title    : 'Cookups',
                                   message  : addmessage,
                                   uid      : user.uid,
                                   uname    : user.uname });
  }
});

/*
  Route for /recipe/add:

    addRecipe.html will need to provide the following variables:
      -name
      -ingredients
      -instructions
    possibly:
      -totalTime
      -servings
      -calories

    Redirects to / if user is not signed in or to /user/create
    with a success or error message.
*/
router.post('/add', function(req, res) {

  var user = req.session.user;

  if (user === undefined) {
    res.redirect('/');
  }
  else {

    var recipe = {name          : req.body.name,
                  ingredients   : req.body.ingredients,
                  instructions  : req.body.instructions,
                  totalTime     : req.body.totalTime,
                  servings      : req.body.servings,
                  calories      : req.body.calories};

    db.addRecipe(recipe, function(error, success) {
      if (error) {
        req.flash('addmsg', error);
        res.redirect('/create');
      }
      else {
        req.flash('addmsg', 'Recipe successfully added');
        res.redirect('/create');
      }
    });
  }
});

module.exports = router;
