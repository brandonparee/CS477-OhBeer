Meteor.methods({
  'setLatLon': function(barId){
    check(barId, String);
    let bar = Bars.findOne(barId);
    console.log(bar);
    console.log("GET", "https://maps.googleapis.com/maps/api/geocode/json?address=" + bar.location.address + bar.location.city + bar.location.state + bar.location.zip + "&key=AIzaSyBrek7eusc5FCeBAYatUTYuX41dSmWw8NQ");
  }
});
