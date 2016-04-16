const handleRedirect = ( routes, redirect ) => {
	let currentRoute = FlowRouter.getRouteName();
	if ( routes.indexOf( currentRoute ) > -1 ) {
		FlowRouter.go( redirect );
		return true;
	}
};

Template.default.helpers({
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
			'dashboard'
		], '/splash' );
	}
});

Template.default.onCreated(() => {
	console.log(RemoteDocuments.find().fetch())
})
