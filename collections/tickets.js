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
    allowedValues: ['pending', 'started', 'delivering', 'complete', 'rejected', 'oos'],
    defaultValue: 'pending'
  },
  'orderTotal': {
    type: Number
  },
  'tipTotal': {
    type: Number,
    defaultValue: 0
  },
  'orderNum': {
    type: Number,
    max: 999,
    min: 1,
    autoValue: function() {
        let bar = Bars.findOne(this.field('barId').value)
        if (bar){
          let ret = bar.orderTicker
          if (ret > 999){
            Bars.update(bar._id, {$set: {orderTicker: 1}})
          }else{
            if (Meteor.isServer)
              Bars.update(bar._id, {$inc: {orderTicker: 1}})
          }
          return ret
      }
    }
  }
});

Tickets.attachSchema( TicketSchema );
