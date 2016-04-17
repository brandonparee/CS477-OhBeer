Template.header.helpers({
    brandLink() {
        let login = FlowRouter.path('splash'),
            index = FlowRouter.path('index');
        return !Meteor.loggingIn() && !Meteor.userId() ? login : index;
    },
    currentBar() {
      if (Meteor.user().bar) {
        return Bars.findOne(Meteor.user().bar).name
      }
      return false
    }
});

Template.header.events({
    'click .logout' (event) {
        event.preventDefault();

        Meteor.logout((error) => {
            if (error) {
                Bert.alert(error.reason, 'warning');
            } else {
                Bert.alert('Logged out!', 'success');
            }
        });
    }
});
