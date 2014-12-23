<img src="./pictures/CrickNew_17.png" alt="Register">

#CookUps#
<img src="./pictures/logo.png" alt="Register">

# Technical Design Specification 

## Summary of the Project Idea

<sub>Author: Mina Khan, November 14th</sub>

Think of Cookups as the "Google for Recipes"! Cookups allows you to search for recipes based on your available ingredients. CookUps generates recipes for your ingredients and other preferences, such as calorie count, preparation time, preferred cuisine, dietary restrictions and food allergies. Once a recipe is found CookUps will make a shopping cart for you of needed ingredients. If you have everything, great; if not, our shopping cart makes it easy to run to the store and pick up missing ingredients. We give our users convenience, tasty food and fitness under one roof. 

CookUps also allows members to add their recipes to CookUps database or to their private recipe diaries so that members may maintain their own cookbooks online and also search for recipes that CookUps members have uploaded. Cookups makes cooking fun by adding a social component to cooking as our members may add, share, rate and recommend recipes on Cookups and talk about cooking tips on our forums. Cookups’ membership makes CookUps highly personalized as members can keep track of food they have cooked in past and bookmark their favourite recipes. 

## Site Flow

<sub>Author: Mina Khan, November 14th</sub>

![alt sitemap](https://github.com/umass-cs-326/team-cinnamon-crickets/blob/master/docs/dspec/pictures/sitemap.png)

## Libraries, Frameworks, APIs and Modules
<sub>Author: Albert Ung, November 14th</sub>
<sub>Edited: Patrick, Dec. 04, 2014 </sub>

### Node Modules:
	
* body parser - Node.js body parsing middleware  
    
    We will be using this in order to parse to and from json formatted objects. When we make a request/receive information from the database we will have to make the information into json format or parse it in order to use the information that was retrieved.
	
* connect-flash - Allow for an action/event to occur without having to reload a page
    
    We will use this specifically when authenticating users when signing into their accounts. This will allow for authentication without having to do a page load into to determine if a user is within our database.

* cookie-parser - Parse cookie header and populate req.cookies with an object keyed by the cookie names
    
    For this, we would like to support the use of cookies. In using cookies, when I sign into my account on cookups and open a new browser/table, I will still be signed into my account. 

* debug - Node’s core debugging technique
    
    For this, we will use this during development in order to test for bugs as well as solve/ understand bugs.
	
* ejs - Embedded JavaScript templates
    
    For this, we will be using .ejs instead of .jade template files to display information to the user. These templates files are a way to display information without having to write all a lot of html. We decided to use ejs instead of jade because ejs seemed more intuitively similar to html than jade.

* express-session - Allow for sessions to occur / saved on cookie
    
    For this, we would like the support of saving a session and returning to it to the user. We will use both express session and cookie parser node modules together to support the ability for users to 	return to a specific session when they were on cookups.org

* morgan - Http request logger middleware for node js
    * For this, we will use this for automated logging of requests, responses and related data. This will log statements to stdout showing details of: remote ip, request method, http version, response status, user agent, etc. It will allow us to modify the log using tokens or add color to them by defining ‘dev’ or even logging out to an output stream, like a file. We will also be using this to ensure that our functionality of our website (moving from different pages, PUT / POST / GET methods are fully functional)

* request
    
    Designed to be the simplest way possible to make http calls. It supports HTTPS follows redirects by default.

* server-favicon - Node.js middleware for serving a favicon
    
    For this, we will use this to cache the favicon icon which users request frequently and indiscriminately in memory to improve performance by skipping disk access. 

* stylus - Robust, expressive, and feature rich CSS superset
    
    For this, we will use this for the UI design of our website. We will incorporate this with some CSS from bootstrap in order to create a simple yet beautiful design.

* postgres - Node.js module for postgreSQL access
    
    With access to our server’s Postgres instance, we can store and retrieve user’s information, including profiles, recipes, pantry items, and cookbooks. 

### PostgreSQL Library

* To store information about user information,

    * For this, we’re in the middle of creating a schema that will contain tables (username, password, and email) that will store user information when they sign up. We will use this database to also verify that an entered username and password from the user is within our database, and from there upload the specific user content based on the username and password provided from the user. Otherwise, it will give the user an option to browser for recipes or sign up with cookups.

    ADD PICTURE OF DATABASE TABLE (Albert will do this)

* To store recipes that are being uploaded by users that have signed up on the cookups website,

    * For this, we’re in the middle of creating a schema that will contain tables that hold recipe information with username of the user that uploaded the recipe. When a specific user is login, and would like to see recipes that he/she has uploaded, queries to this table will occur to show all the recipes that a specific user has uploaded. 
		
* To search for recipes,

    * For this, we mainly use the yummly database in order to search for recipes based on a specific criteria (ingredients, calorie amount, saltiness level, etc.). But if a user uploads recipes, there will be another database that holds only uploaded recipes of users. So we will also be making queries to this database in order to grab recipes that have been uploaded by users based on a specific criteria (ingredients, calorie amount, saltiness level, etc.)

* Our database contains four tables, which are used to handle user accounts, user recipes, and user pantries.
		
    * Users:  
        Contains user information useful for login and building a user profile. The Id is used in UsersRecipes and UsersSavedRecipes to reference user’s created recipes and saved recipes.
        { Id, UserName, Email, Password, Bio, ProfilePicture }

    * Recipes: 
        Contains user-created recipes and the recipe information. Each unique Id is referred to in UsersRecipes and UsersSavedRecipes for table joining.
        { Id, UserName, TotalTime, Ingredients[], Servings, Instructions, flavors (piquant … sour), rating }

    * UsersRecipes
        Joins user’s to their created recipes with Id relations
        { UserId, RecipeId}

    * UsersFavoriteRecipes
        Joins user’s to their saved recipes with Id relations
        { UserId, RecipeId}

    * Pantries
        Keeps record of each user’s pantry items/ingredients
        { UserId, ingredients[] }

### Express web development framework
	
* Minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
    For this, we will be using express as the web application framework for cookups. Express will handle the interactions of requests for a specific url, which view to display for that request, insert/remove recipes or users, grab recipes/ information from the Yummly database, create cookies/ sessions, etc.

### Bootstrap (HTML, CSS and JS framework)
	
* To use for UI design.
    For this, we will be incorporating bootstrap in order to provide a beautiful and simple UI design for our website. Bootstrap offers great resources to be used for a UI design that is very simple to implement and incorporate within a website. This saves us a lot of time because none of us are experienced UI designers

### jquery - javascript library
	
* Fast, small, and feature-rich JavaScript library.
    For this, we will use jQuery to make things like HTML document traversal and manipulation, event handling, animation, and Ajax works across a multitude of browsers

### Yummly API
	
* To use for grabbing recipes
    For this, we will be using the yummly database in order to give users the correct recipes that correlate with the specific criteria they would want  either by ingredients, calorie amount, spice level, etc. We did not want to manly include each recipe so therefore we are using the yummly api to retrieve results and give them back to the user

### AJAX
	
* Updating information asynchronously without reloading the page
    For this, we will be using this when users request for recipes for a specific criteria that they would like. When the the user search for the result, part of the website will change to display the current recipes that correlate with the search.

## Individual components, components of important pieces and how they fit into the web application environment

<sub>Authors Patrick Collins & Jon Saj November 14th</sub>  

### Views and Routes

* Home page, depending on whether or not the user is a member, will use the DBModule.GetUserById. Routes can be /index.html brings to the Cookups. It can go to /search. Will be rendered with index.ejs and use home.js. This will be the base layout view for the rest of the routes, most routes will be able to route to the same places this one routes too, show functionality. 

* /Search (Possible) Will have all the routes and views of home page (if we add), with collaborate with the search.ejs and use the search.js and the DBModule.searchIngredient.

* /recipe/view Will display a recipe with all available details, including instructions, recipe photo, attributes, and createdbyuser. Rendered using recipe.ejs and recipe.js. Information requested from the DBModule.getRecipeById. Detailed Recipe attributes can be found in the dbmodule description.
* 

* /loginpage works so that people without an account can make one and renders with the view of login.ejs. Uses the DatabaseModule.loginUser method. Simple text boxes so that they can communicate with the database in accessing the login usernames and passwords. Will be simple and have few routes, mostly back to /index.

* /about is rendered with the view aboutus.ejs, and contains information regarding the incredible team of Cinnamon Crickets, how we formed, 326 class, o on and so forth, similar to /index.

* /viewprofile Renders a public view of a users profile, accessed from a user profile link on a recipe page. It displays username, bio, created recipes, and a userphoto. It makes use of the profile.ejs and profile.js files, as well as DBModule.getUserById

* /privateprofile Renders the users private editable profile. It makes use of the privateprofile.ejs and privateprofile.js files, as well as DBModule.getPersonalProfile and DBModule.AddUserInformation if a user makes changes to their profile inforation, including password, picture, and bio info.
* 
*Disclaimer: Not in Betarelease.*

* /register so those without a membership can create one, and collaborates with register.ejs and uses the DatabaseModule.addUser method, has a similar view to /login and will be similarly simple. Has text boxes so that we can easily collaborate with the database to make the usernames and passwords.

* /addrecipe the page can be accessed by members only and uses the DatabaseModule.addRecipe method, if not a member you will be redirected to /login and this will render the view of addrecipe.ejs. Has many text fields for the various variables to be saved and uploaded to the database.

* /logout just deletes session and redirect to /index and will be with the view.

* /blog with render blog.ejs and will have not a lot of js to it, mostly be posts from time to time about updates.
*DisClaimer: Not in Beta Release.*

* /Mydiet and /Myhistory are possible pages to be made, or we could dynamically create them, but they would be rendered with mydiet.ejs and myhistory.ejs respectivly.  
*DisClaimer: Not in Beta Release.*
	
### Database 
<sub>Authors Isaac Vawter & Jon Saj, November 14th</sub>

* Users: As people register to use CookUps.org their userdata is stored in the CookUps.org’s local database. This information is used whenever a user attempts to login into Cookup.org. It is also used to link individual users to their favorite and added recipes. 
* Recipes: The recipes that users add to CookUps.org are stored in the local database and modeled after the recipe objects provided by the Yummly api. These recipes are accessed via Cookup.org’s search function as well as user’s recipe diary.
* Favorites:  User’s are able to flag their favorite recipes that they’ve found on CookUps. These recipes are mapped to the user within the database and are directly accessable to that user.
* User's Recipes: Users have the option to store recipes in the local database. These are automatically flagged as favorite recipes for that user and are accessible to every user on Cookups.org via the search function.
* Pantry: Each user can store ingredients within the local database that they wish to use frequently in the searches they make.

### Custom Node.js Modules
<sub>Authors Isaac Vawter & Jon Saj, November 14th</sub>

#### CookupsDB module: 
Handling all database access, this module makes SQL requests through the pg module. Alongside the Yummly Module, It is used within the MergedAccess Module.
* AddUser: Used in a new user page, the passed in userInfo JSON will provide the information needed to store a new user. Required fields are userName, email, and password.
	* args: (userInfo, callback(error, result))
		* userinfo: a ^ shows optional fieds: { userName, email, password, ^bio, ^imagePath }
		* result: {id, name, imagePath}
		* error: null if successful. Else error description
* LoginUser: A request and callback are passed into the function. The user’s ID and password taken from the request will be used to query the database. On a successful return the callback will validate the user’s session.
	* args: (requestuser, callback(error, result))
		* requestuser: {email, password}
		* error: null if successful. Else error description
		* result: result: {id, name, imagePath}
* GetUserById: A database Lookup for a users public profile information. This call is used when a user profile page is generated. The userId comes from the link to the users profile.
	* args: (userId, callback(error, result))
		* userId int will be used to for database lookup
		* result: { id, name, email, bio, pictureurl, favorites[], recipes[] }
		* error: null if successful. Else error description
* GetPersonalProfile: A database lookup for a users private profile. This information will be used to generate a users own profile page, where they can modify user information
	* args (userId, callback(error, result))
		* userId int will be used for database lookup
		* result: { id, name, email, bio, imagePath, favorites[ {recipeId, name, imagePath }], pantry[ingredient], usersRecipes[ {recipeId, name, imagePath }] }
		* error: null if successful. Else error description
* AddUserInformation: Called when a user wants to commit a change to profile, including email or password change. Will replace existing info in db, if exists.
	* args (userInfo, callback(error, result))
		* userinfo: will replace existing info. All fields are optional, since this method can modify any of a users info, with the exception of : {userName, email, password, imagePath, bio}
		* result: Same as PersonalProfile to getnerate Profile Page
		* error: null if successful. Else error description
* AddUserFavorite: A recipe Id, taken from recipe page, is added to users favorites array
	* args (recipeId, callback(error))
		* recipeId will be added to the users favorites in the database
		* error: null if successful. Else error description
* RemoveUserFavorite: A recipe Id, taken from favorites list page, is removed from users favorites array
	* args (recipeId, callback(error))
		* recipeId will be removed from the users favorites in the db
		* error: null if successful. Else error description
* SearchRecipes: Each search paramater in the object is optional. This allows searches to range from general by name to specific by ingredients, taste, etc.
	* args: (searchparams, callback(error, result))
		* searchparams: If params are omitted, they will not be searched on. {name, totalTime, ingredients[], servings, instructions, minimumrating, flavors (piquant… sour) }
		* result: {id, name, totalTime, servings, instructions, flavors (piquant… sour), rating, imagePath }
		* error, null if successful. Else error description
* GetRecipeById: Looks up a single Recipe By Id. Used to generate a recipe page
	* args: (recipeId, callback(error, result))
		* recipeID int will be used to for database lookup
		* result: { Id, UserName, TotalTime, Ingredients[], Servings,  Instructions, flavors (piquant … sour), rating }
		* error: null if successful. Else error description
* AddRecipe: With an associated User id, a new recipe is added to the database. Required fields are UserId, recipeName, Instructions, ImagePath.
	* args: (recipe, callback(error, result))
		* recipe: optional params noted with * mark: {userId, name, *totalTime, *servings, *flavor(piquant... sour), ingredients[], instructions, imagepath}
		* result: { Same format recipe result as GetRecipeById }
		*error: null if successful. Else error description
* DeleteRecipe: All Recipe Data related to Id, including entries in users favorites, is removed from database
	* args: (recipeId, callback(error))
		* recipeId: Recipe information with this id is removed from database, including if other users have favorited this recipe
		* error: null if successful. Else error description
* GetUserRecipesById: Using a UserId, all recipes created by a user are returned. The object returned contains an array of objects identical to GetRecipeById
	* args: (userId, callback(error, result))
		* userId: int used for lookup
		* result: {  { Same format recipe result as GetRecipeById }[] }
		* error: null if successful. Else error description
* GetUserFavorites: Using a UserId, a list of users favorite recipes is returned. Return objects are modeled as in GetUserRecipesById
	* args: (userId, callback(error, result))
		* userId int will be used to for database lookup
		* result: { { Same format recipe result as GetRecipeById }[] }
		* error: null if successful. Else error description
* GetUserPantryById: Using a UserId, an array of ingredients is returned. Thse are the users pantry list
	* args: (userId, callback(error, result))
		* userId int will be used to for database lookup
		* result: { ingredients[] }
		* error: null if successful. Else error description
* AddToUserPantry: An object containing a UserId and an array of ingredients to add is inserted into the users pantry in database
	* args:(userPantry, callback(error, result))
		* userPantry: {userId, ingredients[] }
		* result: { successfulIngredients[], failedIngredients[] }
		* error: null if successful. Else error description
 
#### Yummly module:
Using a request object from the MergedAccess Module, a RESTful request is built and sent to yummly. The response object will return yummly’s search results back to the MergedAccessModule. 
* SearchRecipes : this will build a RESTful call for the yummly api. The resulting object comes from yummly
	* args: (searchparams, callback(error, result))
		* searchparams: If params are omitted, they will not be searched on. {name, totalTime, ingredients[], servings, instructions, minimumrating, flavors (piquant… sour) }
		* result: Yummly Result JSON
		* error: null if successful. Else error description
* GetRecipeById : By using a Yummly Recipe Id, we use the Yummly API to request that recipe object
	* args: (recipeId, callback(error, result))
		* Yummly Recipe Id String will  be used for Yummly API recipe lookup.
		* result: Yummly Result JSON
		* error: null if successful. Else error description

### Yummly API
<sub>Mina, November 14th</sub>  
We use a serialized form to get search based on the following parameters:
* preferred ingredients, excluded ingredients, allergies, dietary restrictions, cuisine types, allowed course, excluded course, allowed holiday, flavor, nutritional value and number of calories.
		
#### MergedAccess Module:
 Accessing both the CookupsDB module and the Yummly module, this custom module returns user information and recipe information. Recipe data responding to search requests are returned from both the CookupsDB module and the Yummly Module are combined for use within appropriate routes. *Refer to CookupsDBModule for method arguments. Method Calls and Objects are Identical. Note that recipe objects returned from a Yummly source also include a recipe Url and Yummly Logo.
* Login User
* AddUser
* GetUserById
* GetPersonalProfile
* AddUserInformation
* AddUserFavorite
* RemoveUserFavorite
* GetUserPantryById
* AddToUserPantry
* AddRecipe
* DeleteRecipe
* SearchRecipes
* GetRecipeById
* GetUserRecipesById
* GetUserFavorites

## Connection and communication between parts of the system
<sub>Author Evan Bellmore, November 14th</sub>

Cookups.org has multiple backend modules that it works with, MergedAccessModule, YummlyModule and CookupsDBModule. The general design of Cookups.org is that our front end pages will communicate directly to with the MergedAccessModule which then uses both YummlyModule and CookupsDBModule to simultaneously work with our database and the Yummly API. The modules then return the data to the web pages and present them to a 

### Relationship to functional specification
Our sitemap and pages are carefully drafted to fulfill all the functional sepcifications listed in functional specifications in assignment 3

### Implementation challenges

We have already started the implementation and the main challenges we see are in simultaneously querying our internal database and Yummly API, and then ranking the search results from the two databases. We also need to maintain member accounts, member's recipes and member's diet history. Also, we shall have blog posts, so we shall need our back-end and database to be fairly well designed and effective.
In terms of front-end, we want to have a premium design and user-friedly interface, so we'll have to try a number of different design considerations.

## Task allocation ##
<sub>Author Evan Bellmore, Mina November 14th</sub>   
<sub>Edited Patrick Collins Dec. 04, 2014 </sub>

###Evan: Front-end developer

Evan is responsible for implement the UI design and functionality for the profile page.

###Gabriel: Server connection developer

Gabriel is responsible for allowing http requests and databases storage to be handled within his own personal server.

###Jon: Backend developer

Jon is responsible for creating the PostgreSQL scheme and database to store users and add new recipes. Jon is also responsible for implementing search recipe functionality for the internal recipe database.

###Albert: Front-end developer

Albert is responsible for implementing the UI design and functionality for the add recipe page

###Patrick: Front-end developer

Patrick is responsible for content and design of the html/css, as well as secretary tasks.

###Mina: Back-end and front-end developer

On the front-end, Mina is responsible for the creating search form, and search results page. On the back-end, she is responsible for implementing search recipe functionality with regards to yummly API. Mina also performs team management tasks. 

###Isaac: Back-end developer

Isaac is responsible for routes and helping Jon on the database. 

## System Overview and architecture
<sub>Author Evan Bellmore, November 14th</sub>  

The application a node application using the express framework. Our database is using postgreSQL. We will be using our database for storing recipes added by users and user information. For non-stored recipes we are using the Yummly API. Our front end pages will make one call to the MergedAccessModule and that will simultaneously search our database and the Yummly Database returning results. 
