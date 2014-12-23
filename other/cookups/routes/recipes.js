var express = require('express');
var router = express.Router();
var db = require('cookModule');
/* GET home page. */
router.get('/', function(req, res) {
	res.redirect('/');
//  res.render('index', { title: 'Cookups' });
});


router.get('/add', function(req, res){
	res.render('addrecipe.ejs', { title : 'Add Recipe' });
});

router.post('/auth', function(req, res){
	req.body.ingredients = [req.body.ingredient];
	db.addRecipe(req.body, function(error, result){
		res.redirect('/');
	});

});
module.exports = router;
