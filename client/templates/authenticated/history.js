import Highcharts from 'highcharts'

Template.history.onCreated(() => {
  Template.instance().subscribe('myBar')
})

Template.historyHelper.onCreated(() => {
  Template.instance().subscribe('myMenu', Meteor.user().bar)
  Template.instance().subscribe('barTickets', Meteor.user().bar);
})

Template.drinkSalesGraph.helpers({
  historyLoaded(){
    let itemList = MenuItems.find().map(function(item){
      return item.name;
    })
    let itemIds = MenuItems.find().map(function(item){
      return item._id;
    })
    dataVals = []
    itemIds.forEach(function(item){
      let tickets = Tickets.find({$and: [{order: {$elemMatch: {item: item}}}, {status: 'complete'}]})
      let ticketCounts = 0
      tickets.forEach(function(ticket){
        for (let order of ticket.order) {
          if(order.item == item){
            ticketCounts += order.quantity
          }
        }
      })
      console.log(ticketCounts)
      dataVals.push(ticketCounts)
    })
    let bar = Bars.findOne(Meteor.user().bar);
    $('ul.tabs').tabs();
    $('#chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Drink Sales by Drink'
        },
        xAxis: {
            categories: itemList
        },
        yAxis: {
            title: {
                text: 'Drinks Sold'
            }
        },
        series: [{
            name: 'Drink',
            data: dataVals
        }]
    });
  }
});

Template.incomeGraph.helpers({
  historyLoaded(){
    let itemList = MenuItems.find().map(function(item){
      return item.name;
    })
    let itemIds = MenuItems.find().map(function(item){
      return item._id;
    })
    dataVals = []
    itemIds.forEach(function(item){
      let tickets = Tickets.find({$and: [{order: {$elemMatch: {item: item}}}, {status: 'complete'}]})
      let ticketCounts = 0
      tickets.forEach(function(ticket){
        for (let order of ticket.order) {
          if(order.item == item){
            ticketCounts += order.quantity
          }
        }
      })
      console.log(ticketCounts)
      dataVals.push(ticketCounts)
    })
    let bar = Bars.findOne(Meteor.user().bar);
    $('ul.tabs').tabs();
    $('#chart1').highcharts({
        chart: {
            type: 'column',
            width: document.getElementById('graph-container').clientWidth
        },
        title: {
            text: 'Drink Sales by Drink'
        },
        xAxis: {
            categories: itemList
        },
        yAxis: {
            title: {
                text: 'Drinks Sold'
            }
        },
        series: [{
            name: 'Drink',
            data: dataVals
        }]
    });
  }
});
