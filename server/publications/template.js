Meteor.publish( 'template', function() {
  return Collection.find( { 'owner': this.userId }, { fields: { 'owner': 1 } } );
});

Meteor.publish('userProfile', function() {
  return Meteor.users.find(this.user)
})
