Orders = new Meteor.Collection( 'orders' );

Orders.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Orders.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let OrderItem = new SimpleSchema({
  "item": {
    type: String
  },
  "quantity": {
    type: Number
  }
})

let OrderSchema = new SimpleSchema({
  "userId": {
    type: String,
  },
  "barId": {
    type: String
  },
  "items": {
    type: [OrderItem]
  },
  "orderTotal": {
    type: String
  }
});

Orders.attachSchema( OrderSchema );
