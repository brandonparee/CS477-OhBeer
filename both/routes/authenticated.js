const authenticatedRoutes = FlowRouter.group( { name: 'authenticated' } );

authenticatedRoutes.route( '/', {
  name: 'index',
  action() {
    BlazeLayout.render( 'default', { yield: 'dashboard' } );
  }
});

authenticatedRoutes.route( '/settings', {
  name: 'settings',
  action() {
    BlazeLayout.render( 'default', { yield: 'settings' } );
  }
});

authenticatedRoutes.route( '/create-bar', {
  name: 'createBar',
  action() {
    BlazeLayout.render( 'default', { yield: 'createBar' } );
  }
});

authenticatedRoutes.route( '/sample-ticket', {
  name: 'sampleTicket',
  action() {
    BlazeLayout.render( 'default', {yield: 'sampleTicket'})
  }
})
