Meteor.startup( () => {
  Bert.defaults.style = 'growl-bottom-right';
  AutoForm.setDefaultTemplate('materialize');
  today = new Date()
  Session.setDefault('endDate', today)
  today.setDate(today.getDate() - 7)
  Session.setDefault('startDate', today)
});
