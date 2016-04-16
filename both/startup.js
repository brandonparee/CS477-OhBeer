Meteor.startup( () => {
	remote = DDP.connect('http://localhost:3000/');
	RemoteDocuments = new Mongo.Collection('documents', { connection: remote });
  // Code to run on client *and* server startup.  
});
