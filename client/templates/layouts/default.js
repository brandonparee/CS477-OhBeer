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
		if (Meteor.user().bar) {
			return false
		}
		return true
	}
});

Template.default.onCreated(() => {
		Template.instance().subscribe( 'me' )
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
        	Meteor.users.update(Meteor.userId(), {$set: {bar: result}})
	      }
	    },
			onSuccess: (formType, result) => {
				Meteor.call('setLatLon', Meteor.user().bar);
				if (formType == "insert") {
					Bert.alert("Bar Created Successfully", 'success')
				}else if (formType == "update"){
					Bert.alert("Bar Modified Successfully", 'success')
				}
		}
	}
})
