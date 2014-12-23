var db = require('./cookModule');

var newUser = {
				uname:'billn',
				email:'billn@nye.com',
				password:'thescience',
				bio:'I am Bill N.'
				}

var be1 = {
	        uid: 1,
			title: 'First Entry',
			extract:'fun times'
			}

var be2 = {
			uid: 1,
			title: 'Second Entry',
			extract:'More fun times'
			}

var be3 = {
			uid: 2,
			title: 'Awesome Entry',
			extract:'Super fun times'
			}

var be9 = {
			eid: 9,
	        uid: 1,
	        time: "Mon Nov 17 2014 17:50:05 GMT-0500 (EST)",
			title: 'First Entry Revised Twice',
			extract:'funnest times forever and ever'
			}		

// db.addBlogEntry(be1, function(error, result){
// 	if(error) return console.log(error);
// 	console.log(result.title + " has been added to your blog");
// });

// db.addBlogEntry(be2, function(error, result){
// 	if(error) return console.log(error);
// 	console.log(result.title + " has been added to your blog");
// });

// db.addBlogEntry(be3, function(error, result){
// 	if(error) return console.log(error);
// 	console.log(result.title + " has been added to your blog");
// });

db.getUserBlog(1, function(error, result){
	if(error) return console.log(error);
	console.log(result);
});

// db.editBlogEntry(be9, function(error, result){
// 	if(error) return console.log(error);
// 	console.log("An edit has been made to your blog, " + result + " has been added or modified");
// });

// db.getUserBlog(2, function(error, result){
// 	if(error) return console.log(error);
// 	console.log(result);
// });

// db.deleteUserBlog(2, function(error, result){
// 	if(error) return console.log(error);
// 	console.log(result);
// });

// db.deleteBlogEntry(2, function(error, result){
// 	if(error) return console.log(error);
// 	console.log(result);
// });