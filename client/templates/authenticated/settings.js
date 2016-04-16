
Template.isRendered.onRendered(() => {
    $('ul.tabs').tabs();
})

Template.settings.onCreated(() => {
    Template.instance().subscribe( 'myBar' )
})

AutoForm.hooks({
    barForm: {
      insert: {
        before: (doc) => {
          doc.owner = Meteor.userId()
          return doc
        }
      }
    }
})
