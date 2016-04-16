const handleRedirect = ( routes, redirect ) => {
	let currentRoute = FlowRouter.getRouteName();
	if ( routes.indexOf( currentRoute ) > -1 ) {
		FlowRouter.go( redirect );
		return true;
	}
};

Template.default.helpers({
	mobileCheck() {
		if (Meteor.isCordova){
			FlowRouter.go('splashMobile')
		}
	},
	loggingIn() {
		return Meteor.loggingIn();
	},
	authenticated() {
		return !Meteor.loggingIn() && Meteor.user();
	},
	redirectAuthenticated() {
	 	return handleRedirect([
			'login',
			'signup',
			'recover-password',
			'reset-password',
			'splash'
		], '/' );
	},
	redirectPublic() {
		return handleRedirect([
			'index',
			'dashboard',
			'settings'
		], '/splash' );
	},
	needsBar() {
		if (Bars.find().count() > 0) {
			return false
		}
		return true
	}
});

Template.default.onCreated(() => {
	  Template.instance().subscribe( 'myBar' )
})

AutoForm.hooks({
    barForm: {
      before: {
        insert: (doc) => {
          doc.owner = Meteor.userId()
          return doc
        }
			},
      after: {
				insert: (error, result) => {
					console.log(error, result)
        	Meteor.users.update(Meteor.userId(), {$set: {bar: result}})
      }
    }
	}
})
