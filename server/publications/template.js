Meteor.publish('userProfile', function() {
  return Meteor.users.find(this.user)
})
