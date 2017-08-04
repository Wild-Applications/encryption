//Authenticate Router
//Username and Password Login

//imports
var encryptor = {};
var bcrypt = require('bcrypt');

encryptor.encrypt = function(call, callback){
  encryptPassword(10,call,callback);
}

encryptor.check = function(call, callback){
  //do encryption checking
  checkPassword(call, callback);
}


function encryptPassword(saltRounds, call, callback){
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) {
      callback({"message":"0008 - Salt generation failed. This is likely a problem with the salt library"},null);
    } else {
      bcrypt.hash(call.request.password, salt, function(error,hash){
        if(error){
          callback({"message":"0009 - Hashing of the password failed. This could be a problem with the hashing library"}, null);
        }else{
          callback(null,{encrypted:hash});
        }
      });
    }
  });
}

function checkPassword(call, callback){
  bcrypt.compare(call.request.password, call.request.hash, function(err, res){
    if (err) {
      callback({"message":"0010 - Comparison of passwords failed"}, null);
    } else {
      callback(null, {match:res});
    }
  });
}

module.exports = encryptor;
