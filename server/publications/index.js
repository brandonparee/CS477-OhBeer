Meteor.publish( 'menuItems', function() {
  return MenuItems.find()
});

Meteor.publish( 'myBar', function() {
  return Bars.find({owner: this.userId})
})

Meteor.publish( 'myMenu', function(barId) {
  check(barId, String);
  let myId = Bars.findOne(barId);
  console.log(myId);
  console.log(myId.menu);
  return MenuItems.find({_id: {$in:myId.menu}})
})
