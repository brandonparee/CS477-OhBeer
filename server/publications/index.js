Meteor.publish( 'index', function() {
  return Documents.find();
});

Meteor.publish( 'myBar', () => {
  return Bars.find({owner: this.userId})
})
