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
	}
});

Template.default.onCreated(() => {

})
