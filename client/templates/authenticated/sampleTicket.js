Template.sampleTicket.onCreated(() => {
  Template.instance().subscribe( 'myBar')
})

Template.ticketForm.onCreated(() => {
  Template.instance().subscribe( 'myMenu', Bars.findOne()._id )
})

AutoForm.hooks({
  sampleTicketForm: {
    before: {
      insert: (doc) => {
        doc.owner = Meteor.userId()
        doc.barId = Meteor.user().bar
        let total = 0
        for (let obj of doc.order) {
          total += (MenuItems.findOne(obj.item).price * obj.quantity)
        }
        console.log(total)
        doc.orderTotal = total
        return doc
      }
    }
  }
})
