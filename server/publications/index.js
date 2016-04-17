Meteor.publish( 'menuItems', function() {
  return MenuItems.find()
});

Meteor.publish( 'myBar', function() {
  let usr = Meteor.users.findOne(this.userId)
  if (usr.bar)
    return Bars.find({_id: usr.bar})
  else {
    return []
  }
})

Meteor.publish('allBars', function() {
  return Bars.find()
})

Meteor.publish( 'myMenu', function(barId) {
  check(barId, String);
  let myId = Bars.findOne(barId);
  return MenuItems.find({barId: myId._id});
})

Meteor.publish( 'barTickets', function(barId) {
  check(barId, String)
  let myId = Bars.findOne(barId)
  return Tickets.find({barId: myId._id})
})

Meteor.publish( 'me', function() {
  return Meteor.users.find({_id: this.userId}, {services: 0})
})
