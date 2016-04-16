Meteor.publish( 'menuItems', function() {
  return MenuItems.find()
});

Meteor.publish( 'myBar', function() {
  return Bars.find({owner: this.userId})
})

Meteor.publish( 'myMenu', function(barId) {
  check(barId, String);
  let myId = Bars.findOne(barId);
  return MenuItems.find({barId: myId._id});
})
