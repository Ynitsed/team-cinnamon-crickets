# Registration

```javascript
id_string= "_app_id=4667a454";
key_string="_app_key=19e631ca5cc3f554227ff9ee8bc5c753";
id_key=id_string+"&"+key_string;
```

# Search Recipes
* don’t forget to URL-encode use *encodeURI()*!

Plan of action:
* get all ingredients list
* create ingredients dictionary
* create variables to store the user input
* update search variables when user inputs data
* perform search

```javascript
base_url="http://api.yummly.com/v1/api/recipes?"+id_key; // add your search parameter 

var ingredient_dict={};

// 1. get all ingredients list
var ingredient_url="http://api.yummly.com/v1/api/metadata/ingredient?"+id_key;
var ingredient_list= get data from ingredient_url;

// 2. create ingredients dictionary
createIngDictionaryFromList(ingredient_list);

// 3. create variables to store the user input

// search_name
var has_search_name=false; //set it as user updates his search preferences
var search_name="";

//picture
var requires_pictures=true; //set a default value, can change

// The allowedIngredient[] parameter must be set equal to a searchValue found in the Yummly Search Metadata Dictionaries.
var allowed_ingredient=[];
var input_ingredients=[];
var ingre_URL_encoded=encodeURI("&allowedIngredient[]=");

// The excludedIngredient[] parameter must be set equal to a searchValue found in the Yummly Search Metadata Dictionaries.
var excludedIngredient=[];
var input_ExIngredients=[];
var ex_ingre_URL_encoded=encodeURI("&excludedIngredient[]=");

// The allowedAllergy[] parameter must be set equal to a searchValue found in the Yummly Search Metadata Dictionaries.

var allowed_allergy=[Dairy, Egg, Gluten, Peanut, Seafood, Sesame, Soy, Sulfite, Tree Nut, Wheat];

var dairy_code="396^Dairy-Free";
var egg_code="397^Egg-Free";
var peanut_code="394^Peanut-Free";
var gluten_code="393^Gluten-Free";
var seafood_code="398^Seafood-Free";
var sesame_code="399^Sesame-Free";
var soy_code="400^Soy-Free";
var sulfite_code="401^Sulfite-Free";
var treenut_code="395^Tree Nut-Free";
var wheat_code="392^Wheat-Free";

var dairy_free=false;
var egg_free=false;
var peanut_free=false;
var gluten_free=false;
var seafood_free=false;
var sesame_free=false;
var soy_free=false;
var sulfite_free=false;
var treenut_free=false;
var wheat_free=false;

var allergy_URL_encoded=encodeURI("&allowedAllergy[]=");

// The allowedDiet[] parameter must be set equal to a searchValue found in the Yummly Search Metadata Dictionaries.

var allowed_diet=[Lacto vegetarian, Ovo vegetarian, Pescetarian, Vegan, Vegetarian];

var lactoVeg_code=encodeURI("388^Lacto vegetarian");
var ovoVeg_code=encodeURI("389^Ovo vegetarian");
var pes_code=encodeURI("390^Pescetarian");
var vegan_code="386^Vegan";
var vegetarian_code=encodeURI("387^Lacto-ovo vegetarian");

var is_lactoVeg=false;
var is_ovoVeg=false;
var is_pes=false;
var is_vegan=false;
var is_vegetarian=false;

var diet_URL_encoded=encodeURI("&allowedDiet[]=");

// The allowedCuisine[] parameter must be set equal to a searchValue found in the Yummly Search Metadata Dictionaries.

var allowed_cuisine=[American, Italian, Asian, Mexican, Southern & Soul Food, French, Southwestern, Barbecue, Indian, Chinese, Cajun & Creole, English, Mediterranean, Greek, Spanish, German, Thai, Moroccan, Irish, Japanese, Cuban, Hawaiin, Swedish, Hungarian, Portugese];

var american_cuisine="cuisine^cuisine-american";
var italian_cuisine="cuisine^cuisine-italian";
var asian_cuisine="cuisine^cuisine-asian";
var mexican_cuisine="cuisine^cuisine-mexican";
var southern_cuisine="cuisine^cuisine-southern";
var french_cuisine="cuisine^cuisine-french";
var southwest_cuisine="cuisine^cuisine-southwestern";
var bbq_cuisine="cuisine^cuisine-barbecue-bbq";
var indian_cuisine="cuisine^cuisine-indian";
var chinese_cuisine="cuisine^cuisine-chinese";
var cajun_cuisine="cuisine^cuisine-cajun";
var english_cuisine="cuisine^cuisine-english";
var mediterranean_cuisine="cuisine^cuisine-mediterranean";
var greek_cuisine="cuisine^cuisine-greek";
var spanish_cuisine="cuisine^cuisine-spanish";
var german_cuisine="cuisine^cuisine-german";
var thai_cuisine="cuisine^cuisine-thai";
var moroccan_cuisine="cuisine^cuisine-moroccan";
var irish_cuisine="cuisine^cuisine-irish";
var japanese_cuisine="cuisine^cuisine-japanese";
var cuban_cuisine="cuisine^cuisine-cuban";
var hawaiin_cuisine="cuisine^cuisine-hawaiian";
var swedish_cuisine="cuisine^cuisine-swedish";
var hungarian_cuisine="cuisine^cuisine-hungarian";
var portugese_cuisine="cuisine^cuisine-portuguese";

var american=false;
var italian=false;
var asian=false;
var mexican=false;
var southern=false;
var french=false;
var southwest=false;
var bbq=false;
var indian=false;
var chinese=false;
var cajun=false;
var english=false;
var mediterranean=false;
var greek=false;
var spanish=false;
var german=false;
var thai=false;
var moroccan=false;
var irish=false;
var japanese=false;
var cuban=false;
var hawaiin=false;
var swedish=false;
var hungarian=false;
var portugese=false;

var cuisine_URL_encoded=encodeURI("&allowedCuisine[]=");

// excluded cuisine
var ex_american=false;
var ex_italian=false;
var ex_asian=false;
var ex_mexican=false;
var ex_southern=false;
var ex_french=false;
var ex_southwest=false;
var ex_bbq=false;
var ex_indian=false;
var ex_chinese=false;
var ex_cajun=false;
var ex_english=false;
var ex_mediterranean=false;
var ex_greek=false;
var ex_spanish=false;
var ex_german=false;
var ex_thai=false;
var ex_moroccan=false;
var ex_irish=false;
var ex_japanese=false;
var ex_cuban=false;
var ex_hawaiin=false;
var ex_swedish=false;
var ex_hungarian=false;
var ex_portugese=false;

var ex_cuisine_URL_encoded=encodeURI("&excludedCuisine[]=");

// The allowedCourse[] parameter must be set equal to a searchValue found in the Yummly Search Metadata Dictionaries.

var allowed_course=[Main Dishes, Desserts, Side Dishes, Lunch and Snacks, Appetizers, Salads, Breads, Breakfast and Brunch, Soups, Beverages, Condiments and Sauces, Cocktails];

var mainDish_code=encodeURI("course^course-Main Dishes");
var dessert_code="course^course-Desserts";
var sideDish_code=encodeURI("course^course-Side Dishes");
var lunchSnack_code=encodeURI("course^course-Lunch and Snacks");
var appetizer_code="course^course-Appetizers";
var salad_code="course^course-Salads";
var bread_code="course^course-Breads";
var breakfastBrunch_code=encodeURI("course^course-Breakfast and Brunch");
var soup_code="course^course-Soups";
var beverages_code="course^course-Beverages";
var condiments_code=encodeURI("course^course-Condiments and Sauces");
var cocktails_code=encodeURI("course^course-Cocktails");

var is_maindish=false;
var is_dessert=false;
var is_sidedish=false;
var is_lunchSnack=false;
var is_appetizer=false;
var is_salad=false;
var is_bread=false;
var is_breakfastBrunch=false;
var is_soup=false;
var is_beverages=false;
var is_condiments=false;
var is_cocktails=false;

var course_URL_encoded=encodeURI("&allowedCourse[]=");

// The excludedCourse[] parameter

var ex_maindish=false;
var ex_dessert=false;
var ex_sidedish=false;
var ex_lunchSnack=false;
var ex_appetizer=false;
var ex_salad=false;
var ex_bread=false;
var ex_breakfastBrunch=false;
var ex_soup=false;
var ex_beverages=false;
var ex_condiments=false;
var ex_cocktails=false;

var ex_course_URL_encoded=encodeURI("&excludedCourse[]=");

// The allowedHoliday[] parameter must be set equal to a searchValue found in the Yummly Search Metadata Dictionaries.

var allowed_holiday=[Christmas, Summer, Thanksgiving, New Year, Super Bowl / Game Day, Halloween, Hanukkah, 4th of July];

var christmas_code="holiday^holiday-christmas";
var summer_code="holiday^holiday-summer";
var fall_code="holiday^holiday-fall";
var winter_code="holiday^holiday-winter";
var spring_code="holiday^holiday-spring";
var thanksgiving_code="holiday^holiday-thanksgivukkah";
var newYear_code="holiday^holiday-new-year";
var superbowl_code="holiday^holiday-super-bowl";
var halloween_code="holiday^holiday-halloween";
var hanukkah_code="holiday^holiday-hanukkah";
var 4thJuly_code="holiday^holiday-4th-of-july";

var is_christmas=false;
var is_summer=false;
var is_fall=false;
var is_spring=false;
var is_winter=false;
var is_thanksgiving=false;
var is_newYear=false;
var is_superbowl=false;
var is_halloween=false;
var is_hanukkah=false;
var is_4thJuly=false;

var holiday_URL_encoded=encodeURI("&excludedHoliday[]=");

// excludedHoliday[]

var ex_christmas=false;
var ex_summer=false;
var ex_fall=false;
var ex_spring=false;
var ex_winter=false;
var ex_thanksgiving=false;
var ex_newYear=false;
var ex_superbowl=false;
var ex_halloween=false;
var ex_hanukkah=false;
var ex_4thJuly=false;

var ex_holiday_URL_encoded=encodeURI("&excludedHoliday[]=");

// max_time
var has_max_time=false; //set it as user updates his search preferences
var max_time=36000;
var max_time_url="&maxTotalTimeInSeconds=";

// update flavor
var sweet_min=0;
var meaty_min=0;
var sour_min=0;
var bitter_min=0;
var piquant_min=0;

var sweet_max=1;
var meaty_max=1;
var sour_max=1;
var bitter_max=1;
var piquant_max=1;

// update nutrients
var set_cholestrol=false;
var set_sodium=false;
var set_potassium=false;
var set_sodium=false;
var set_transFat=false;
var set_satFat=false;
var set_carbs=false;
var set_fiber=false;
var set_protein=false;
var set_vitaminC=false;
var set_calcium=false;
var set_iron=false;
var set_sugar=false;
var set_calories=false;
var set_fat=false;
var set_vitaminA=false;

var min_cholestrol=0;
var min_sodium=0;
var min_potassium=0;
var min_sodium=0;
var min_transFat=0;
var min_satFat=0;
var min_carbs=0;
var min_fiber=0;
var min_protein=0;
var min_vitaminC=0;
var min_calcium=0;
var min_iron=0;
var min_sugar=0;
var min_calories=0;
var min_fat=0;
var min_vitaminA=0;

var max_cholestrol=10000;
var max_sodium=10000;
var max_potassium=10000;
var max_sodium=10000;
var max_transFat=10000;
var max_satFat=10000;
var max_carbs=10000;
var max_fiber=10000;
var max_protein=10000;
var max_vitaminC=10000;
var max_calcium=10000;
var max_iron=10000;
var max_sugar=10000;
var max_calories=10000;
var max_fat=10000;
var max_vitaminA=10000;

// 4. update search variables when user inputs data

//update search_name & has_search_name
if has_search_name:
	base_url += "&q="+search_name; // search_name

// update picture required
base_url += "&requirePictures=" +requires_pictures;	

// update ingredients list
for (k=0; k<input_ingredients.length;k++){
	new_ingredient=input_ingredients[k];
	if validIngredient(new_ingredient):
		allowed_ingredient.push(new_ingredient);
}

for (i=0; i<allowed_ingredient.length;i++){
	base_url += ingre_URL_encoded+allowed_ingredient[i];
}

// update excluded ingredients list
for (k=0; k<input_ExIngredients.length;k++){
	new_ingredient=input_ExIngredients[k];
	if validIngredient(new_ingredient):
		excludedIngredient.push(new_ingredient);
}

for (i=0; i<excludedIngredient.length;i++){
	base_url += ex_ingre_URL_encoded+excludedIngredient[i];
}

// update allergy list
dairy_free;
egg_free;
peaunt_free;
gluten_free;
seafood_free;
sesame_free;
soy_free;
sulfite_free;
treenut_free;
wheat_free;

if dairy_free:
	base_url += allergy_URL_encoded+dairy_code;

if egg_free:
	base_url += allergy_URL_encoded+egg_code;

if peanut_free:
	base_url += allergy_URL_encoded+peanut_code;

if gluten_free:
	base_url += allergy_URL_encoded+gluten_code;

if seafood_free:
	base_url += allergy_URL_encoded+seafood_code;

if sesame_free:
	base_url += allergy_URL_encoded+sesame_code;

if soy_free:
	base_url += allergy_URL_encoded+soy_code;

if sulfite_free:
	base_url += allergy_URL_encoded+sulfite_code;

if treenut_free:
	base_url += allergy_URL_encoded+treenut_code;

if wheat_free:
	base_url += allergy_URL_encoded+wheat_code;

// update diet using user input
is_lactoVeg;
is_ovoVeg;
is_pes;
is_vegan;
is_vegetarian;

if is_lactoVeg:
	base_url += allergy_URL_encoded+lactoVeg_code;

if is_ovoVeg:
	base_url += allergy_URL_encoded+ovoVeg_code;

if is_pes:
	base_url += allergy_URL_encoded+pes_code;

if is_vegan:
	base_url += allergy_URL_encoded+vegan_code;

if is_vegetarian:
	base_url += allergy_URL_encoded+vegetarian_code;

var diet_URL_encoded=encodeURI("&allowedDiet[]");

// update cuisine 
american=;
italian=;
asian=;
mexican=;
southern=;
french=;
southwest=;
bbq=;
indian=;
chinese=;
cajun=;
english=;
mediterranean=;
greek=;
spanish=;
german=;
thai=;
moroccan=;
irish=;
japanese=;
cuban=;
hawaiin=;
swedish=;
hungarian=;
portugese=;

if american:
	base_url += cuisine_URL_encoded+american_cuisine;
if italian:
	base_url += cuisine_URL_encoded+italian_cuisine;
if asian=;
	base_url += cuisine_URL_encoded+asian_cuisine;
if mexican:
	base_url += cuisine_URL_encoded+mexican_cuisine;
if southern:
	base_url += cuisine_URL_encoded+southern_cuisine;
if french:
	base_url += cuisine_URL_encoded+french_cuisine;
if southwest:
	base_url += cuisine_URL_encoded+southwest_cuisine;
if bbq:
	base_url += cuisine_URL_encoded+bbq_cuisine;
if indian:
	base_url += cuisine_URL_encoded+indian_cuisine;
if chinese:
	base_url += cuisine_URL_encoded+chinese_cuisine;
if cajun:
	base_url += cuisine_URL_encoded+cajun_cuisine;
if english:
	base_url += cuisine_URL_encoded+english_cuisine;
if mediterranean:
	base_url += cuisine_URL_encoded+mediterranean_cuisine;
if greek:
	base_url += cuisine_URL_encoded+greek_cuisine;
if spanish:
	base_url += cuisine_URL_encoded+spanish_cuisine;
if german:
	base_url += cuisine_URL_encoded+german_cuisine;
if thai:
	base_url += cuisine_URL_encoded+thai_cuisine;
if moroccan:
	base_url += cuisine_URL_encoded+moroccan_cuisine;
if irish:
	base_url += cuisine_URL_encoded+irish_cuisine;
if japanese:
	base_url += cuisine_URL_encoded+japanese_cuisine;
if cuban:
	base_url += cuisine_URL_encoded+cuban_cuisine;
if hawaiin:
	base_url += cuisine_URL_encoded+hawaiin_cuisine;
if swedish:
	base_url += cuisine_URL_encoded+swedish_cuisine;
if hungarian:
	base_url += cuisine_URL_encoded+hungarian_cuisine;
if portugese:
	base_url += cuisine_URL_encoded+portugese_cuisine;


// update excluded cuisine 
ex_american=;
ex_italian=;
ex_asian=;
ex_mexican=;
ex_southern=;
ex_french=;
ex_southwest=;
ex_bbq=;
ex_indian=;
ex_chinese=;
ex_cajun=;
ex_english=;
ex_mediterranean=;
ex_greek=;
ex_spanish=;
ex_german=;
ex_thai=;
ex_moroccan=;
ex_irish=;
ex_japanese=;
ex_cuban=;
ex_hawaiin=;
ex_swedish=;
ex_hungarian=;
ex_portugese=;

if ex_american:
	base_url += ex_cuisine_URL_encoded+american_cuisine;
if ex_italian:
	base_url += ex_cuisine_URL_encoded+italian_cuisine;
if ex_asian=;
	base_url += ex_cuisine_URL_encoded+asian_cuisine;
if ex_mexican:
	base_url += ex_cuisine_URL_encoded+mexican_cuisine;
if ex_southern:
	base_url += ex_cuisine_URL_encoded+southern_cuisine;
if ex_french:
	base_url += ex_cuisine_URL_encoded+french_cuisine;
if ex_southwest:
	base_url += ex_cuisine_URL_encoded+southwest_cuisine;
if ex_bbq:
	base_url += ex_cuisine_URL_encoded+bbq_cuisine;
if ex_indian:
	base_url += ex_cuisine_URL_encoded+indian_cuisine;
if ex_chinese:
	base_url += ex_cuisine_URL_encoded+chinese_cuisine;
if ex_cajun:
	base_url += ex_cuisine_URL_encoded+cajun_cuisine;
if ex_english:
	base_url += ex_cuisine_URL_encoded+english_cuisine;
if ex_mediterranean:
	base_url += ex_cuisine_URL_encoded+mediterranean_cuisine;
if ex_greek:
	base_url += ex_cuisine_URL_encoded+greek_cuisine;
if ex_spanish:
	base_url += ex_cuisine_URL_encoded+spanish_cuisine;
if ex_german:
	base_url += ex_cuisine_URL_encoded+german_cuisine;
if ex_thai:
	base_url += ex_cuisine_URL_encoded+thai_cuisine;
if ex_moroccan:
	base_url += ex_cuisine_URL_encoded+moroccan_cuisine;
if ex_irish:
	base_url += ex_cuisine_URL_encoded+irish_cuisine;
if ex_japanese:
	base_url += ex_cuisine_URL_encoded+japanese_cuisine;
if ex_cuban:
	base_url += ex_cuisine_URL_encoded+cuban_cuisine;
if ex_hawaiin:
	base_url += ex_cuisine_URL_encoded+hawaiin_cuisine;
if ex_swedish:
	base_url += ex_cuisine_URL_encoded+swedish_cuisine;
if ex_hungarian:
	base_url += ex_cuisine_URL_encoded+hungarian_cuisine;
if ex_portugese:
	base_url += ex_cuisine_URL_encoded+portugese_cuisine;	

// update course
is_maindish=;
is_dessert=;
is_sidedish=;
is_lunchSnack=;
is_appetizer=;
is_salad=;
is_bread=;
is_breakfastBrunch=;
is_soup=;
is_beverages=;
is_condiments=;
is_cocktails=;

if is_maindish:
	base_url += course_URL_encoded+ mainDish_code;
if is_dessert:
	base_url += course_URL_encoded+ dessert_code;
if is_sidedish:
	base_url += course_URL_encoded+ sideDish_code;
if is_lunchSnack:
	base_url += course_URL_encoded+ lunchSnack_code;
if is_appetizer:
	base_url += course_URL_encoded+ appetizer_code;
if is_salad:
	base_url += course_URL_encoded+ salad_code;
if is_bread:
	base_url += course_URL_encoded+ bread_code;
if is_breakfastBrunch:
	base_url += course_URL_encoded+ breakfastBrunch_code;
if is_soup:
	base_url += course_URL_encoded+ soup_code;
if is_beverages:
	base_url += course_URL_encoded+ beverages_code;
if is_condiments:
	base_url += course_URL_encoded+ condiments_code;
if is_cocktails:
	base_url += course_URL_encoded+ cocktails_code;

// update excluded course
ex_maindish=;
ex_dessert=;
ex_sidedish=;
ex_lunchSnack=;
ex_appetizer=;
ex_salad=;
ex_bread=;
ex_breakfastBrunch=;
ex_soup=;
ex_beverages=;
ex_condiments=;
ex_cocktails=;

if ex_maindish:
	base_url += ex_course_URL_encoded+ mainDish_code;
if ex_dessert:
	base_url += ex_course_URL_encoded+ dessert_code;
if ex_sidedish:
	base_url += ex_course_URL_encoded+ sideDish_code;
if ex_lunchSnack:
	base_url += ex_course_URL_encoded+ lunchSnack_code;
if ex_appetizer:
	base_url += ex_course_URL_encoded+ appetizer_code;
if ex_salad:
	base_url += ex_course_URL_encoded+ salad_code;
if ex_bread:
	base_url += ex_course_URL_encoded+ bread_code;
if ex_breakfastBrunch:
	base_url += ex_course_URL_encoded+ breakfastBrunch_code;
if ex_soup:
	base_url += ex_course_URL_encoded+ soup_code;
if ex_beverages:
	base_url += ex_course_URL_encoded+ beverages_code;
if ex_condiments:
	base_url += ex_course_URL_encoded+ condiments_code;
if ex_cocktails:
	base_url += ex_course_URL_encoded+ cocktails_code;

// update holiday
is_christmas=;
is_summer=;
is_fall=;
is_spring=;
is_winter=;
is_thanksgiving=;
is_newYear=;
is_superbowl=;
is_halloween=;
is_hanukkah=;
is_4thJuly=;

if is_christmas:
	base_url +=holiday_URL_encoded+christmas_code;
if is_summer:
	base_url +=holiday_URL_encoded+summer_code;
if is_fall:
	base_url +=holiday_URL_encoded+fall_code;
if is_spring:
	base_url +=holiday_URL_encoded+spring_code;
if is_winter:
	base_url +=holiday_URL_encoded+winter_code;
if is_thanksgiving:
	base_url +=holiday_URL_encoded+thanksgiving_code;
if is_newYear:
	base_url +=holiday_URL_encoded+newYear_code;
if is_superbowl:
	base_url +=holiday_URL_encoded+superbowl_code;
if is_halloween:
	base_url +=holiday_URL_encoded+halloween_code;
if is_hanukkah:
	base_url +=holiday_URL_encoded+hanukkah_code;
if is_4thJuly:
	base_url +=holiday_URL_encoded+4thJuly_code;

// exclude holiday
ex_christmas=;
ex_summer=;
ex_fall=;
ex_spring=;
ex_winter=;
ex_thanksgiving=;
ex_newYear=;
ex_superbowl=;
ex_halloween=;
ex_hanukkah=;
ex_4thJuly=;

if ex_christmas:
	base_url +=ex_holiday_URL_encoded+christmas_code;
if ex_summer:
	base_url +=ex_holiday_URL_encoded+summer_code;
if ex_fall:
	base_url +=ex_holiday_URL_encoded+fall_code;
if ex_spring:
	base_url +=ex_holiday_URL_encoded+spring_code;
if ex_winter:
	base_url +=ex_holiday_URL_encoded+winter_code;
if ex_thanksgiving:
	base_url +=ex_holiday_URL_encoded+thanksgiving_code;
if ex_newYear:
	base_url +=ex_holiday_URL_encoded+newYear_code;
if ex_superbowl:
	base_url +=ex_holiday_URL_encoded+superbowl_code;
if ex_halloween:
	base_url +=ex_holiday_URL_encoded+halloween_code;
if ex_hanukkah:
	base_url +=ex_holiday_URL_encoded+hanukkah_code;
if ex_4thJuly:
	base_url +=ex_holiday_URL_encoded+4thJuly_code;	

// update flavor

sweet_min;
meaty_min;
sour_min;
bitter_min;
piquant_min;

sweet_max;
meaty_max;
sour_max;
bitter_max;
piquant_max;

base_url += "&flavor.sweet.min="+sweet_min+"&flavor.sweet.max="+sweet_max+"&flavor.meaty.min="+meaty_min+"&flavor.meaty.max="+meaty_max+"&flavor.sour.min="+sour_min+"&flavor.sour.max="+sour_max+"&flavor.bitter.min="+bitter_min+"&flavor.bitter.max="+bitter_max+"&flavor.piquant.min="+piquant_min+"&flavor.piquant.max="+piquant_max;

// update max time
max_time=;
base_url +=max_time_url + max_time

// update nutrients
// update nutrient preferences
set_cholestrol=;
set_sodium=;
set_potassium=;
set_sodium=;
set_transFat=;
set_satFat=;
set_carbs=;
set_fiber=;
set_protein=;
set_vitaminC=;
set_calcium=;
set_iron=;
set_sugar=;
set_calories=;
set_fat=;
set_vitaminA=;

if set_cholestrol:
	min_cholestrol=;
	max_cholestrol=;
	base_url += "&nutrition.CHOLE.min="+min_cholestrol"&nutrition.CHOLE.max="+max_cholestrol;

if set_potassium:
	min_potassium=;
	max_potassium=;
	base_url += "&nutrition.K.min="+min_cholestrol"&nutrition.K.max="+max_cholestrol;

if set_sodium:
	min_sodium=;
	max_sodium=;
	base_url += "&nutrition.K.min="+min_cholestrol"&nutrition.K.max="+max_cholestrol;

if set_transFat:
	min_transFat=;
	max_transFat=;
	base_url += "&nutrition.FATRN.min="+min_cholestrol"&nutrition.FATRN.max="+max_cholestrol;

if set_satFat:
	min_satFat=;
	max_satFat=;
	base_url += "&nutrition.FASAT.min="+min_cholestrol"&nutrition.FASAT.max="+max_cholestrol;

if set_carbs:
	min_carbs=;
	max_carbs=;
	base_url += "&nutrition.CHOCDF.min="+min_cholestrol"&nutrition.CHOCDF.max="+max_cholestrol;

if set_fiber:
	min_fiber=;
	max_fiber=;
	base_url += "&nutrition.FIBTG.min="+min_cholestrol"&nutrition.FIBTG.max="+max_cholestrol;

if set_protein:
	min_protein=;
	max_protein=;
	base_url += "&nutrition.PROCNT.min="+min_cholestrol"&nutrition.PROCNT.max="+max_cholestrol;

if set_vitaminC:
	min_vitaminC=;
	max_vitaminC=;
	base_url += "&nutrition.VITC.min="+min_cholestrol"&nutrition.VITC.max="+max_cholestrol;

if set_calcium:
	min_calcium=;
	max_calcium=;
	base_url += "&nutrition.CA.min="+min_cholestrol"&nutrition.CA.max="+max_cholestrol;

if set_iron:
	min_iron=;
	max_iron=;
	base_url += "&nutrition.FE.min="+min_cholestrol"&nutrition.FE.max="+max_cholestrol;

if set_sugar:
	min_sugar=;
	max_sugar=;
	base_url += "&nutrition.SUGAR.min="+min_cholestrol"&nutrition.SUGAR.max="+max_cholestrol;

if set_calories:
	min_calories=;
	max_calories=;
	base_url += "&nutrition.ENERC_KCAL.min="+min_cholestrol"&nutrition.ENERC_KCAL.max="+max_cholestrol;

if set_fat:
	min_fat=;
	max_fat=;
	base_url += "&nutrition.FAT.min="+min_cholestrol"&nutrition.FAT.max="+max_cholestrol;

if set_vitaminA:
	min_vitaminA=;
	max_vitaminA=;
	base_url += "&nutrition.VITA_IU.min="+min_cholestrol"&nutrition.VITA_IU.max="+max_cholestrol;

//update ingredients if ingrdient is found in Yummly Search Metadata Dictionaries
function validIngredient(ingredient){
	return ingredient in ingredient_dict;
}

function createIngDictionaryFromList(list){
	for (j=0; j<list.length;j++){
	name=list[j]["searchValue"]
	ingredient_dict[name]= list[j]["description"];
	}
	return ingredient_dict;
}
```


# Get Recipe Response Categories

Decide hoe to display the folowing attributes

* "attribution" --> "html"
* "ingredientLines" --> []
* "flavors" --> {"Salty" ,"Meaty", "Piquant", "Bitter", "Sweet"}
* "nutritionEstimates" --> {{"attribute", "description", "value", "unit"-->{"name", "abbreviation", "plural", "pluralAbbreviation"}, },{}...}
* "images" :[{"hostedLargeUrl":, "hostedSmallUrl":}]
* "name"
* "yield"
* "totalTime"
* "attributes": {"holiday":[], "cuisine": [], }
* "totalTimeInSeconds"
* "rating"
* "numberOfServings"
* "id"
* "source" :{"sourceRecipeUrl":, "sourceSiteUrl":, "sourceDisplayName":}