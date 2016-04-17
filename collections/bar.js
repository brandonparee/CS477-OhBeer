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
  "location": {
    type: Object
  },
  "location.address": {
    type: String
  },
  "location.unit": {
    type: String,
    optional: true
  },
  "location.city": {
    type: String
  },
  "location.state": {
    type: String
  },
  "location.zip": {
    type: Number
  },
  "location.lat": {
    type: String,
    optional : true
  },
  "location.lon": {
    type: String,
    optional : true
  },
  "location.formattedAddress": {
    type: String,
    optional : true
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
