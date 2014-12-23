var express = require('express');
var router = express.Router();
var db = require('cookupsdb');
var fs = require('fs');
var path = require('path');
// get ingredients
var request = require("request")

var pagetitle = 'CookUps'

router.get('/', function(req, res){
  var user = req.session.user;
  res.render('upload.html', { title: pagetitle, user : user });
});

/* POST home page. */
router.post('/uploadimage', function(req, res) {
	console.log(req.files.files.path);
	res.redirect('/ul');
});

router.post('/uploadProfileImage', function(req, res) {
	
	if(req.files.files !== undefined){

	var pictureName = "/uploads/"+req.files.files.name;



	var user = req.session.user;
	console.log(user['picture']);
	
	user['picture'] = pictureName;
	
	db.editUser(user,function(error, res){

	});
	
}
	res.redirect('/viewProfile');


});


// app.post('/upload', function (req, res) {
//     // var tempPath = req.files.file.path,
//     //     targetPath = path.resolve('./uploads/image.png');
//     // if (path.extname(req.files.file.name).toLowerCase() === '.png') {
//     //     fs.rename(tempPath, targetPath, function(err) {
//     //         if (err) throw err;
//     //         console.log("Upload completed!");
//     //     });
//     // } else {
//     //     fs.unlink(tempPath, function () {
//     //         if (err) throw err;
//     //         console.error("Only .png files are allowed!");
//     //     });
//     // }
//     // ...
// });

// app.get('/image.png', function (req, res) {
//     res.sendfile(path.resolve('./uploads/image.png'));
// }); 

module.exports = router;
