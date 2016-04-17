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

Template.registerHelper('prettyPrice', (price) => {
	let str = "$" + (price/100).toString()
	if (str.split('.')[1].length < 2) {
		str += "0"
	}
	return str
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
				Meteor.call('setLatLon', result);
				if (formType == "insert") {
					Bert.alert("Bar Created Successfully", 'success')
				}else if (formType == "update"){
					Bert.alert("Bar Modified Successfully", 'success')
				}
		}
	}
})
