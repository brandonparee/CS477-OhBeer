Template.dashboard.onCreated( () => {
  	  Template.instance().subscribe( 'myBar' )
})

Template.ticketList.onCreated(() => {
  Template.instance().subscribe( 'myMenu', Bars.findOne()._id )
  Template.instance().subscribe( 'barTickets', Bars.findOne()._id )
})

Template.ticketList.helpers({
  tickets() {
    console.log(Tickets.findOne())
    return Tickets.find()
  },
  userFromId(id) {
    return Meteor.users.findOne(id)
  },
  itemFromId(id) {
    return MenuItems.findOne(id)
  }
})
