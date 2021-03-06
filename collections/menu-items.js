MenuItems = new Meteor.Collection( 'menuItems' );

MenuItems.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});


let MenuItemSchema = new SimpleSchema({
  "barId": {
    type: String
  },
  "name": {
    type: String
  },
  "price": {
    type: String
  },
  "category": {
    type: String
  },
  "inStock": {
    type: Boolean,
    defaultValue: true
  }
})

MenuItems.attachSchema( MenuItemSchema )
