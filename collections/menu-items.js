MenuItems = new Meteor.Collection( 'menuItems' );

MenuItems.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

MenuItems.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let MenuItemSchema = new SimpleSchema({
  "name": {
    type: String
  },
  "price": {
    type: String
  },
  "category": {
    type: [String]
  }
})

MenuItems.attachSchema( MenuItemSchema )
