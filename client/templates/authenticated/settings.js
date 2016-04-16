
Template.isRendered.onRendered(() => {
    $('ul.tabs').tabs();
})

Template.barProfile.helpers({
  bar() {
    return Bars.findOne()
  }
})
