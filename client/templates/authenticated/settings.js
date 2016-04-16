Template.settings.onCreated(() => {
  Template.instance().subscribe('menuItems')
})

Template.isRendered.onRendered(() => {
    $('ul.tabs').tabs();
})

Template.settings.onCreated(() => {
    Template.instance().subscribe( 'myBar' )
})
