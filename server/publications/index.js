Meteor.publish( 'menuItems', function() {
  return MenuItems.find()
});

Meteor.publish( 'myBar', function() {
  let bar = Meteor.users.findOne(this.userId).bar
  if (bar)
    return Bars.find({_id: bar})
  else {
    return []
  }
})

Meteor.publish('aBar', function(barId) {
  return Bars.find({_id: barId})
})

Meteor.publish( 'myMenu', function(barId) {
  check(barId, String);
  let myId = Bars.findOne(barId);
  return MenuItems.find({barId: myId._id});
})

Meteor.publish( 'me', function() {
  return Meteor.users.find({_id: this.userId}, {services: 0})
})
