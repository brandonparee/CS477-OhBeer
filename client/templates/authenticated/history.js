import Highcharts from 'highcharts'

Template.history.onCreated(() => {
  Template.instance().subscribe('myBar')
})

Template.historyHelper.onCreated(() => {
  Template.instance().subscribe('myMenu', Meteor.user().bar)
  Template.instance().subscribe('barTickets', Meteor.user().bar);
})

Template.historyHelper.helpers({
  historyLoaded() {
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  }
})

Template.drinkSalesGraph.helpers({
  historyLoaded(){
    initDrinkSales()
  }
});

Template.incomeGraph.helpers({
  historyLoaded(){
    initIncome()
  }
});

Template.completionTimeGraph.helpers({
  historyLoaded(){
    initCompletionTime()
  }
});

Template.history.events({
  'click .datePickerBtn': (event) => {
      event.preventDefault()
      event.stopPropagation()
      $("input.datepicker[id=" + event.currentTarget.id + "]").first().pickadate("picker").open();
  },
  'change .datepicker': (event) => {
    $('#chart').empty()
    $('#chart1').empty()
    $('#chart2').empty()
    initCompletionTime()
    initIncome()
    initDrinkSales()
    let date = new Date(event.currentTarget.value)
    if (event.currentTarget.id == "inputStartDate"){
      Session.set('startDate', date)
    }
    else{
      Session.set('endDate', date)
    }
  }
})

initCompletionTime = function() {
  let dataVals = [],
    itemList = []
  let divs = 8
  let start = new Date(Session.get('startDate'))
  let end = new Date(Session.get('endDate'))
  let tickets = Tickets.find({$and: [
    {status: 'complete'},
    {dateCreated: {$gte: start}},
    {dateUpdated: {$lte: end}}
  ]})
  let diff = end.getTime() - start.getTime()
  for (let i = 1; i <= divs; i++) {
    let p = new Date(start.getTime() + 24*60*60*1000 + (i* diff/divs))
    dataVals.push(0)
    itemList.push(p.toGMTString())
  }
  tickets.forEach((ticket) => {
    let i = 0
    while(ticket.dateUpdated.getTime() > new Date(itemList[i++]).getTime());
    dataVals[i] += (ticket.dateUpdated.getTime() - ticket.dateCreated.getTime())/(1000*60)
  })
  let bar = Bars.findOne(Meteor.user().bar);
  $('ul.tabs').tabs();
  $('#chart2').highcharts({
      chart: {
          type: 'line',
          width: document.getElementById('graph-container') ? document.getElementById('graph-container').clientWidth : 0
      },
      title: {
          text: 'Completion Time'
      },
      xAxis: {
          categories: itemList
      },
      yAxis: {
          title: {
              text: 'Minutes'
          }
      },
      series: [{
          name: "Date",
          data: dataVals
      }]
  });
}

initIncome = function() {
  let dataVals = [],
    itemList = []
  let divs = 8
  let start = new Date(Session.get('startDate'))
  let end = new Date(Session.get('endDate'))
  let tickets = Tickets.find({$and: [
    {status: 'complete'},
    {dateCreated: {$gte: start}},
    {dateCreated: {$lte: end}}
  ]})
  let diff = end.getTime() - start.getTime()
  for (let i = 1; i <= divs; i++) {
    let p = new Date(start.getTime() + 24*60*60*1000 + (i* diff/divs))
    dataVals.push(0)
    itemList.push(p.toGMTString())
  }
  tickets.forEach((ticket) => {
    let i = 0
    while(ticket.dateCreated.getTime() > new Date(itemList[i++]).getTime());
    dataVals[i] += (ticket.orderTotal/100)
  })
  let bar = Bars.findOne(Meteor.user().bar);
  $('ul.tabs').tabs();
  $('#chart1').highcharts({
      chart: {
          type: 'line',
          width: document.getElementById('graph-container') ? document.getElementById('graph-container').clientWidth : 0
      },
      title: {
          text: 'Income'
      },
      xAxis: {
          categories: itemList
      },
      yAxis: {
          title: {
              text: '$'
          }
      },
      series: [{
          name: "Date",
          data: dataVals
      }]
  });
}

initDrinkSales = function() {
  let itemList = MenuItems.find().map(function(item){
    return item.name;
  })
  let itemIds = MenuItems.find().map(function(item){
    return item._id;
  })
  dataVals = []
  itemIds.forEach(function(item){
    let tickets = Tickets.find({$and: [
      {order: {$elemMatch: {item: item}}},
      {status: 'complete'},
      {dateUpdated: {$gte: new Date(Session.get('startDate'))}},
      {dateUpdated: {$lte: new Date(Session.get('endDate'))}}
    ]})
    let ticketCounts = 0
    tickets.forEach(function(ticket){
      for (let order of ticket.order) {
        if(order.item == item){
          ticketCounts += order.quantity
        }
      }
    })
    dataVals.push(ticketCounts)
  })
  let bar = Bars.findOne(Meteor.user().bar);
  $('ul.tabs').tabs();
  $('#chart').highcharts({
      chart: {
          type: 'column',
          width:  document.getElementById('graph-container') ? document.getElementById('graph-container').clientWidth : 0
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
