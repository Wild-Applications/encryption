//User service

//Imports
const grpc = require('grpc');
const encryptionHelper = require('./helpers/encryption.helper.js');
const proto = grpc.load(__dirname + '/proto/encryption.proto');
const server = new grpc.Server();

//define the callable methods that correspond to the methods defined in the protofile
server.addService(proto.user.EncryptionService.service, {
  encryptPassword: function(call, callback){
    encryptionHelper.encrypt(call, callback);
  }

});

//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
console.log('gRPC encryption server running on port: 50051');
