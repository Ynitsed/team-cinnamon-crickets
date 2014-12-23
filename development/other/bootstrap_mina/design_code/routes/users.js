var express = require('express');
var router = express.Router();

var userlib = require('../lib/user');

var newUser = {};

// A logged in "database":

// # User Server-Side Routes

// ## login
// Provides a user login view.
router.get('/login', function(req, res){
  // Grab any messages being sent to use from redirect.
  var authmessage = req.flash('auth') || '';

  // TDR: redirect if logged in:
  var user  = req.session.user;

  // TDR: If the user is already logged in - we redirect to the
  // main application view. We must check both that the `userid`
  // and the `online[userid]` are undefined. The reason is that
  // the cookie may still be stored on the client even if the
  // server has been restarted.
  if (user !== undefined && userlib.getOnline[user.uid] !== undefined) {
    res.redirect('/user/main');
  }
  else {
    // Render the login view if this is a new login.
    res.render('login.ejs', { title   : 'User Login',
                          message : authmessage });
  }
});

// ## auth
// Performs **basic** user authentication.
router.post('/auth', function(req, res) {
  // TDR: redirect if logged in:
  var user = req.session.user;

  // TDR: do the check as described in the `exports.login` function.
  if (user !== undefined && userlib.getOnline[user.uid] !== undefined) {
    res.redirect('/user/main');
  }
  else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;
    // Perform the user lookup.
    userlib.lookup(username, password, function(error, user) {
      if (error) {
        // If there is an error we "flash" a message to the
        // redirected route `/user/login`.
        req.flash('auth', error);
        res.redirect('/user/login');
      }
      else {
        req.session.user = user;
        // Store the user in our in memory database.
        //online[user.uid] = user;
        userlib.getOnline[user.uid] = user;
        // Redirect to main.
        res.redirect('/user/main');
      }
    });
  }
});


// ## logout
// Deletes user info & session - then redirects to login.
router.get('/logout', function(req, res) {
  var user = req.session.user;
  if (user === undefined || userlib.getOnline[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
    return;
  }

  if (userlib.getOnline[user.uid] !== undefined) {
    delete userlib.getOnline[user.uid];
  }

  delete req.session.user;
  res.redirect('/user/login');
});

// ## main
// The main user view.
router.get('/main', function(req, res) {
  // TDR: added session support
  var user = req.session.user;
  if (user === undefined || userlib.getOnline[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    res.render('main.ejs', { title   : 'User Main',
                         message : 'Login Successful',
                         username : user.username,
                         password : user.password });
  }
});

router.get('/signup', function(req, res){
  var newmessage = req.flash('newuser') || '';
  res.render('signup.ejs', { title: 'User Signup',
			     message: newmessage});
});

router.post('/newuser', function(req, res){
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var retypepassword = req.body.retypepassword;
  
  if(password !== retypepassword){
    res.render('signup.ejs', {  title: 'User Signup', message: "Passwords not the same"});
  }  

  userlib.signUpUser(username, email, password, function(error, returneduser){
  if(error){
    req.flash('signUpUser', error);
    res.redirect('/user/signup');
  } else {
    if(returneduser !== undefined){
      newUser[returneduser.uid] = returneduser;
      res.render('newuser.ejs', { title: 'New User Successfully Signed Up!'});
    } else{
      res.render('signup.ejs', { title: "User Sign Up", message: "username/email already exists, retry with new username/email"})
    }
  }
  });
});

module.exports = router;
