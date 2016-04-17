Tickets = new Mongo.Collection( 'tickets' );

Tickets.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});


let TicketItem = new SimpleSchema({
  'quantity': {
    type: Number
  },
  'item': {
    type: String
  }
})

let TicketSchema = new SimpleSchema({
  'owner': {
    type: String
  },
  'barId': {
    type: String
  },
  'order': {
    type: [TicketItem]
  },
  'status': {
    type: String,
    allowedValues: ['pending', 'started', 'delivering', 'complete']
  },
  'orderTotal': {
    type: Number
  }
});

Tickets.attachSchema( TicketSchema );
