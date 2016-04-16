Meteor.publish( 'menuItems', function() {
  return MenuItems.find()
});

Meteor.publish( 'myBar', function() {
  return Bars.find({_id: Meteor.users.findOne(this.userId).bar})
})

Meteor.publish( 'myMenu', function(barId) {
  check(barId, String);
  let myId = Bars.findOne(barId);
  return MenuItems.find({barId: myId._id});
})

Meteor.publish( 'me', function() {
  return Meteor.users.find(this.userId)
})
