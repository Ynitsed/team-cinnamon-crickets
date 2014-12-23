var db = require('cookupsdb');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	var user = req.session.user;
	for(key in req.query){
		console.log(req.query);
		console.log('-=-=-=-=-=--=-=');
		res.redirect('/');
		return;
	}
	if(! user){
		res.redirect('/');
	}
	else{
		res.redirect('/');
	}
});

/*
	Route for /user/login:

		Login view will be required to take the following fields:
			-title
			-message

		Login view will be required to have a form that prompts the user
		to enter information that maps to the following variable names:
			-email
			-password

		The submit button for the form should redirect to /user/auth.

		Redirects to / if user is already signed-in.
*/
router.get('/login', function(req, res){

  var authmessage = req.flash('auth') || '';

  var user  = req.session.user;

  if (user !== undefined) {
  	res.redirect('/');
  }
  else {
    res.render('login.ejs', { title   : 'User Login',
                          message : authmessage });
  }
});

/*
	Route for /user/logout:

		Logout clears user's session data and redirects to /search/main

*/
router.get('/logout', function(req, res){

  delete req.session.user;
  res.redirect('/');

});


/*
	Route for /user/auth:

		User authentication will require the following variables from the 
		form used in the Login view:
			-email
			-password

		User authentication will update the user's session to include the 
		following variables:
			-uid
			-uname
			-email
			-bio
			-picture

		Redirects to / if user is already signed in or if the 
		user logs in successfully. Redirects to /user/login if user's
		login attempt is unsuccessful.
*/
router.post('/auth', function(req, res) {

  var user = req.session.user;

  if (user !== undefined) {
    res.redirect('/');
  }
  else {

    var unlogged = {email 		: req.body.email,
			password	: req.body.password};

    db.login(unlogged, function(error, user) {
      if (error) {
        req.flash('auth', error);
        res.redirect('/');
      }
      else {
        req.session.user = user;
        res.redirect('/');
      }
    });
  }
});

router.post('/authedit', function(req, res){
	
	var user = req.session.user;
	console.log(user);
	if(!user){
		console.log('user');
		res.redirect('/');
	}
	else{
		req.body.uid = user.uid;
		db.editUser(req.body, function(err, result){
			if(err){
				console.error("error with edit", err);
				res.redirect('/viewProfile');
			}else{
				res.redirect('/viewProfile');
			}
		});
	}
});

/*

*/
router.get('/edit', function(req, res){
	var user  = req.session.user;
	
	if(! user){
		res.redirect('/user/login');
	}
	else {
		db.getUserById(user.uid, function(error, result){
			if(error){
				delete req.session.user;
				res.redirect('/user/login');
			}
			else {
				console.log(result);

				res.render('editprofile2.ejs', { user : result } );
			}	
		});
	}

});


/*
	Route for /user/signup:

		Signup view will be required to take the following fields:
			-title
			-message

		Signup view will be required to have a form that prompts the user
		to enter information that maps to the following variable names:
			-uname
			-password
			-email
			-bio
			-picture

		The submit button for the form should redirect to /user/adduser.

		Redirects to / if the user is already signed in.
*/
router.get('/signup', function(req, res){

  var authmessage = req.flash('auth') || '';

  var user  = req.session.user;

  if (user !== undefined) {
    res.redirect('/');
  }
  else {
    res.render('signup.ejs', { title   : 'Create an Account',
                               message : authmessage });
  }
});


/*
	Route for /user/newuser:

		User authentication will require the following variables from the 
		form used in the signup view:
			-uname
			-password
			-email
			-bio
			-picture

		User authentication will update the user's session to include the 
		following variables:
			-uid
			-uname
			-email
			-bio
			-picture

		Redirects to / if user is already signed in or if the 
		user is added successfully. Redirects to /user/signup if user's
		signup attempt is unsuccessful.
*/
router.post('/newuser', function(req, res) {

  var user = req.session.user;

  if (user !== undefined) {
    res.redirect('/');
  }
  else {

    var noAccount = {uname 		: req.body.uname,
					 email 		: req.body.email,
					 password 	: req.body.password,
					 bio 		: req.body.bio,
					 picture 	: req.body.picture};

    db.addUser(noAccount, function(error, user) {
      if (error) {
        req.flash('auth', error);
        res.redirect('/user/signup');
      }
      else {
        req.session.user = user;
        res.redirect('/');
      }
    });
  }
});

module.exports = router;
