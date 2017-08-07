//Authenticate Router
//Username and Password Login

//imports
var encryptor = {};
var bcrypt = require('bcrypt');

//functions for external users to hook in to
encryptor.hash = function(call, callback){
  hashPassword(10,call,callback);
}

encryptor.check = function(call, callback){
  //do encryption checking
  checkPassword(call, callback);
}


//-----------------------Internal Functions


/**
**Handles the encryption of strings
**saltRounds: integer - number of salt rounds to apply
**call: grpc call
**callback: callback function
**/
function hashPassword(saltRounds, call, callback){
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) {
      callback({"message":"0008 - Salt generation failed. This is likely a problem with the salt library"},null);
    } else {
      bcrypt.hash(call.request.password, salt, function(error,hash){
        if(error){
          callback({"message":"0009 - Hashing of the password failed. This could be a problem with the hashing library"}, null);
        }else{
          //would need to store the hash here.
          callback(null,{encrypted:hash});
        }
      });
    }
  });
}


/**
**Handles the comparison of encrypted strings
**call: grpc call
**callback: callback function
**/
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
