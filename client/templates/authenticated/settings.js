
Template.isRendered.onRendered(() => {
    $('ul.tabs').tabs();
})

Template.barProfile.helpers({
  bar() {
    return Bars.findOne()
  }
})

Template.settings.onCreated( () => {
  	  Template.instance().subscribe( 'myBar' )
})
