Template.dashboard.onCreated( () => {
  	  Template.instance().subscribe( 'myBar' )
})

Template.ticketList.onCreated(() => {
  Template.instance().subscribe( 'myMenu', Bars.findOne()._id )
  Template.instance().subscribe( 'barTickets', Bars.findOne()._id )
})

Template.ticketList.helpers({
  tickets() {
    curr = Tickets.find({$and: [{status: {$not: 'complete'}},
      {status: {$not: 'rejected'}},
      {status: {$not: 'oos'}}]})
    if (curr.count() > 0){
      return curr
    } else {
      return false
    }
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
  },
  'click .item-no-stock': (event) => {
    let ids = event.currentTarget.id.split('-');
    Tickets.update(ids[1], {$set: {status: 'oos'}})
    MenuItems.update(ids[0], {$set: {inStock: false}});
    //console.log(ids[0], ids[1]);
  }
})
