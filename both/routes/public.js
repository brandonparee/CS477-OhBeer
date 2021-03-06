const publicRoutes = FlowRouter.group({
  name: 'public'
});

publicRoutes.route( '/', {
  name: 'index',
  action() {
    FlowRouter.go('splash');
  }
});

publicRoutes.route( '/splash', {
  name: 'splash',
  action() {
    BlazeLayout.render( 'default', { yield: 'splash' } );
  }
});

publicRoutes.route( '/signup', {
  name: 'signup',
  action() {
    BlazeLayout.render( 'default', { yield: 'signup' } );
  }
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    BlazeLayout.render( 'default', { yield: 'login' } );
  }
});

publicRoutes.route( '/recover-password', {
  name: 'recover-password',
  action() {
    BlazeLayout.render( 'default', { yield: 'recoverPassword' } );
  }
});

publicRoutes.route( '/reset-password/:token', {
  name: 'reset-password',
  action() {
    BlazeLayout.render( 'default', { yield: 'resetPassword' } );
  }
});
