/*
 * Jon Saj
 *
*/

var db = require('./cookModule');
var loginUser = {uid:null};
//var db = require('./db');
process.stdin.setEncoding('utf8');

process.stdin.on('readable', function(){
	var chunk = process.stdin.read();
	if(chunk) {
		chunk = chunk.replace(/(\r\n|\n|\r)/gm, '');
		var inputar = chunk.split(" ");
		switch(inputar[0])
		{
		case "login":
			console.log("Login Email: ");
			var user = {};
			var email = process.stdin.read();
			if(email){
				console.log(email);
			}

			user.email = process.stdin.read().replace(/(\r\n|\n|\r)/gm, '');
			console.log("login Pass: ");
			user.pass = process.stdin.read().replace(/(\r\n|\n|\r)/gm, '');
			login(user);
			break;	
		case "logout":
			logout();
			break;
		case "users":
			allUsers();	
			break;
		case "recipes":
			allRecipes();
			break;
		case "search":
			// console.log("Enter an ingredient");
			// var quer = {ingredients:[]};
			// quer.ingredients[0] = process.stdin.read().replace(/(\r\n|\n|\r)/gm, '');
			// console.log("Enter an ingredient or type done to search");
			// var i = 1;

			// while()
			break;
		case "register":
			
			break;
		default:
		
		}
	}
	
});

/*
if (process.argv.length < 3) {
	console.log("usage: -[u|r|n|i|l|] params");
	console.log("List All Users: -u");
	console.log("List All Recipes: -r");
	console.log("Add New User: -n Username Email Password");
	console.log("Find By Ingredients: -i Ingredient [Ingredients]");
	console.log("Login User: -l email password");
	process.exit(1);
}
*/

function login(user){
//	var user = {email:process.argv[3], password:process.argv[4]};
	db.login(user, function(error, result){
		if(error) return console.log(error);
		else{
			 console.log( "User " + result.uid + " logged in. Welcome, " + result.uname );		
			loginUser.uid = result.uid;
		}
	});
}

function logout(){
	loginUser.uid = null;
}

function allUsers(){
//if(process.argv[2] === '-u'){
	db.printAllUsers( function(error, result){
		if(error) return console.log('error', error);
		console.log(result.rows);
	});
}

function allRecipes(){
//if(process.argv[2] === '-r'){
	db.printAllRecipes( function(error, result){
		if(error) return console.log('error', error);
		console.log(result.rows);
	});
}

function addUser(newUser){
//if(process.argv[2] === '-n' && process.argv.length >= 6){
//	var newUser = {uname:process.argv[3],email:process.argv[4],password:process.argv[5]};
	db.addUser(newUser, function(error, result){
		if(error) return console.log('error', error);
		console.log("successfully added " + result.uname + " at Id " + result.uid);
	});


}

function searchByIngredients(query){
//else if(process.argv[2] === '-i' && process.argv.length >= 3){
//	var query = {ingredients:[]};
	for (var i = 3; i < process.argv.length; i++){
		query.ingredients.push(process.argv[i]);
	}
//	console.log(ingreds);
	db.getByIngredients(query, function(error, result){
		if(error) return console.log('error', error);
		
		console.log(result.rows);
	});
}
