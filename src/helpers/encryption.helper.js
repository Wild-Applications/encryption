//Authenticate Router
//Username and Password Login

//imports
var encryptor = {};

encryptor.authenticate = function(call, callback){
  callback(null,{encrypted:"TESTENCRYPTED"});
}

module.exports = encryptor;
