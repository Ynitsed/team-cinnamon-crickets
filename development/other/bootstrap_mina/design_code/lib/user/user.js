// # User Library

var online = {};

// ## User Objects
function User(username, email, password, uid) {
  this.username = username;
  this.password = password;
  // Added uid
  this.email = email;
  this.uid      = uid;
}

// This is our stub database until we look at a real database!
var userdb = [
  new User('tim',   'mit', 'tim@gmail.com', 1),
  new User('hazel', 'lezah', 'hazel@gmail.com', 2),
  new User('caleb', 'belac','caleb@gmail.com', 3),
  new User('admin', 'admin', 'admin@gmail.com', 4),
  new User('albert', 'albert', 'albert@gmail.com', 5)
];
/*
exports.userExists = function(username, cb){
  for (var i in userdb){
    if(userdb[i].username === username){
      cb(undefined, true);
    }
  }
  cb(undefined, false);
}

exports.getOnline = function(){
  return online;
}

exports.addUser = function(username, password, admin, cb){
   for(var i in userdb){
     if(userdb[i].username === username){
       cb(undefined);
     }
   }
   var new_user = new User(username, password, userdb.length+1, admin);
   userdb.push(new_user);
   cb(undefined, new_user);
}
*/
exports.signUpUser = function(username, email, password, cb){
   for(var i in userdb){
     if((userdb[i].username === username) || (userdb[i].email === email)){
       cb(undefined);
     }
   }
   var new_user = new User(username, email, password, userdb.length+1);
   userdb.push(new_user);
   cb(undefined, new_user);
}
/*
exports.grabAdmins = function(){
   var admins = {};
   for(var i in userdb) {
     if(userdb[i].admin === true){
       admins[i] = userdb[i];
     }
   }
   return admins;
}
*/
//
// ## lookup function
// locates a user by `name` if it exists. Invokes callback `cb` with the
// signature cb(error, userobj).
//
exports.lookup = function(username, password, cb) {
  var len = userdb.length;
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (u.username === username) {
      if (u.password === password) {
        cb(undefined, u);
      }
      else {
        cb('password is not correct');
      }
      return;
    }
  }
  cb('user not found');
};

