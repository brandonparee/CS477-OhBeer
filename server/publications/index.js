Meteor.publish( 'menuItems', function() {
  return MenuItems.find()
});

Meteor.publish( 'myBar', function() {
  return Bars.find({owner: this.userId})
})
