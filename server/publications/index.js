Meteor.publish( 'menuItems', function() {
  return MenuItems.find()
});

Meteor.publish( 'myBar', () => {
  return Bars.find({owner: this.userId})
})
