var express = require('express');
var router = express.Router();
var db = require('cookupsdb');
var fs = require('fs');
// get ingredients
var request = require("request")

var pagetitle = 'CookUps'

var ingredients;
fs.readFile('ingredients.json', {encoding:'utf8'}, function(err,data){
  if(err) throw err;
  ingredients = JSON.parse(data);
});

/* GET home page. */
router.get('/', function(req, res) {
  var user = req.session.user;
  if(user){
    pagetitle = user.uname + '\'s CookUps';
  }
  res.render('form3.ejs', { title: pagetitle , ingredients: ingredients, user : user});
});

module.exports = router;