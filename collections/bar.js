SimpleSchema.debug = true

Bars = new Meteor.Collection( 'bars' );

let BarsSchema = new SimpleSchema({
  "name": {
    type: String
  },
  "address": {
    type: String
  },
  "phone": {
    type: String,
    optional: true
  },
  "owner": {
    type: String
  },
  "menu": {
    type: [String]
  }
});

Bars.attachSchema(BarsSchema)
