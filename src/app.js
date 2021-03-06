//User service

//Imports
const grpc = require('grpc');
const encryptionHelper = require('./helpers/encryption.helper.js');
const proto = grpc.load(__dirname + '/proto/encryption.proto');
const server = new grpc.Server();

//define the callable methods that correspond to the methods defined in the protofile
server.addService(proto.encryption.EncryptionService.service, {
  encryptPassword: function(call, callback){
    encryptionHelper.hash(call, callback);
  },
  checkPassword: function(call, callback){
    encryptionHelper.check(call, callback);
  }
});

//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
console.log('gRPC encryption server running on port: 50051');

process.on('SIGTERM', function onSigterm () {
  console.info('Got SIGTERM. Graceful shutdown start', new Date().toISOString())
  server.tryShutdown(()=>{
    process.exit(1);
  })
});
