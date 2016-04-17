import { EJSON } from 'meteor/ejson'

Meteor.methods({
  'setLatLon': function(barId){
    check(barId, String);
    let bar = Bars.findOne(barId);
    //console.log(bar);
    //console.log("https://maps.googleapis.com/maps/api/geocode/json?address=" + bar.location.address + bar.location.city + bar.location.state + bar.location.zip + "&key=AIzaSyBrek7eusc5FCeBAYatUTYuX41dSmWw8NQ");
    let results = HTTP.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + bar.location.address + bar.location.city + bar.location.state + bar.location.zip + "&key=AIzaSyBrek7eusc5FCeBAYatUTYuX41dSmWw8NQ");
    console.log(results.data.results[0].geometry.location.lat);
    //console.log(results.data.geometry.location.lat);
    //console.log(results.data.geometry.location.lng);
    Bars.update(barId, {$set:{'location.lat': results.data.results[0].geometry.location.lat}});
    Bars.update(barId, {$set:{'location.lon': results.data.results[0].geometry.location.lng}});
    Bars.update(barId, {$set:{'location.formattedAddress': results.data.results[0].formatted_address}});
  },

  'updateOutOfStockTickets': function(itemId, barId){
    check(itemId, String);
    check(barId, String);
    Tickets.find({$and : [{order : {$elemMatch : {item: itemId}}}, {barId : barId}] }).forEach(function(ticket){
      Tickets.update({_id : ticket._id}, {$set: {status: 'oos'}});
    });
    // console.log(tickets);
    //Tickets.update({_id : {$in : tickets}}, {$set: {status: 'oos'}});
    // Tickets.update({order : {$elemMatch : {item: itemId}}}, {$set: {status: 'oos'}});
  }
});
