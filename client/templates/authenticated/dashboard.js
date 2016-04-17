Template.dashboard.onCreated( () => {
  	  Template.instance().subscribe( 'myBar' )
})

Template.ticketList.onCreated(() => {
  Template.instance().subscribe( 'myMenu', Bars.findOne()._id )
  Template.instance().subscribe( 'barTickets', Bars.findOne()._id )
})

Template.ticketList.helpers({
  tickets() {
    return Tickets.find({$and: [{status: {$not: 'complete'}},
      {status: {$not: 'rejected'}},
      {status: {$not: 'oos'}}]})
  },
  userFromId(id) {
    return Meteor.users.findOne(id)
  },
  itemFromId(id) {
    return MenuItems.findOne(id)
  },
  pending(ticket) {
    return (ticket.status == "pending")
  }
})

Template.ticketList.events({
  'click .stage-ticket': (event) => {
    Tickets.update(event.currentTarget.id, {$set: {status: 'started'}})
  },
  'click .reject-ticket': (event) => {
    Tickets.update(event.currentTarget.id, {$set: {status: 'rejected'}})
  },
  'click .complete-ticket': (event) => {
    Tickets.update(event.currentTarget.id, {$set: {status: 'complete'}})
  }
})
