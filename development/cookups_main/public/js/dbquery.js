var db = require('cookupsdb');

function dbsearch(name, ingredients, maxtime, callback){
	var quer = {allowedIngredient: ingredients,
			recipeName : name,
			maxTotalTimeInSeconds : maxtime
		};
	db.dbsearch(query, callback);		
});
