SimpleSchema.debug = true

Bars = new Meteor.Collection( 'bars' );

Bars.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

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
    type: [String],
    optional: true
  }
});

Bars.attachSchema(BarsSchema)
