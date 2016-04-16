Template.settings.onCreated(() => {
  Template.instance().subscribe('menuItems')
})

Template.settings.onRendered(() => {
    $('ul.tabs').tabs();
})
