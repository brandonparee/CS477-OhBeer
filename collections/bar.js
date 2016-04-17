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
    type: Object
  },
  "address.address": {
    type: String
  },
  "address.unit": {
    type: String,
    optional: true
  },
  "address.city": {
    type: String
  },
  "address.state": {
    type: String
  },
  "address.zip": {
    type: Number
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
  },
  "tableService": {
    type: Boolean,
    autoform: {
      afFieldInput: {
        type: "boolean-checkbox"
      }
    }
  }
});

Bars.attachSchema(BarsSchema)
