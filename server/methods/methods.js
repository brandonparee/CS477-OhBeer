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
  }
});
