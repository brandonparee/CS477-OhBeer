Meteor.users.allow({
  insert: () => false,
  update: () => true,
  remove: () => false
});

// Meteor.users.deny({
//   insert: () => true,
//   update: () => true,
//   remove: () => true
// });

User = new SimpleSchema({
	// username: {
	// 	type: String,
	// 	regEx: /[a-z0-9A-Z_.]{3,20}/,
	// 	optional: true
	// },
	emails: {
		type: [Object],
		optional: true
	},
	"emails.$.address": {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	"emails.$.verified": {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true
	},
  bar: {
    type: String,
    optional: true
  }
});
Meteor.users.attachSchema(User);
