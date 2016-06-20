// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
locationApp = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

locationApp.controller("locationCtrl", function($scope){
  $scope.getLocation = function(){
    /*var posOption = {timeout: 3000, enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOption).then(function(position){
        var latt = position.coords.latitude;
        var longt = position.coords.longtitude;

        alert(latt+","+longt);
    }, function(err){
        console.log(err);
    });*/

    console.log("geolocation...");
    if (navigator.geolocation) {
      console.log("found geolocation");
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this device.");
    }
  }

  $scope.clear = function(){
    document.getElementById("result").innerHTML = "";
  }
});

function showPosition(position){

  var lati = position.coords.latitude;
  var longi = position.coords.longitude;
  //console.log(lati+","+longi);

  nearestPosition(lati,longi);
  //nearestPosition(-29.449954, 151.938150);
}

/*
  lat = x1;
  lon = y1;

  latitude[] = x2;
  longitude[] = y2;
*/
function nearestPosition(lat,lon){
  document.getElementById("result").innerHTML += "Current location: "+lat+","+lon+"<br/><br/>";
  console.log("Find nearest position");
  // Array of each location
  var name = ["Sydney","Melbourne","Brisbane","Perth"];
  var latitude = [-33.868675,-37.815812,-27.474620,-31.954848]; 
  var longitude = [151.206140,144.961296,153.024217,115.856694];

  var nearest_distance = Number.MAX_VALUE; //nearest distance
  var nearest_index = 0; //nearest point index

  // Loop to check nearest point
  for(var i =0;i<latitude.length;i++){
    console.log(name[i]);
    /*var x1 = lat;
    var y1 = lon;
    var x2 = latitude[i];
    var y2 = longitude[i];

    var temp = Math.sqrt((Math.pow(x1,2)-Math.pow(x2,2))+(Math.pow(y1,2)-Math.pow(y2,2))); //calculate distance*/

    var temp = distance(lat,lon,latitude[i],longitude[i],"K");
    console.log("distance:"+temp+"km");

    document.getElementById("result").innerHTML += name[i]+": "+temp+" km<br/>";

    if(temp<nearest_distance){
      nearest_distance = temp;
      nearest_index = i;
      console.log("Current nearest position is "+name[i]);
    }
  }

  // Get nearest point
  document.getElementById("result").innerHTML += "<br/><br/>Nearest location:"+name[nearest_index];
  
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at http://www.geodatasource.com                          :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: http://www.geodatasource.com                        :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2015            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function distance(lat1, lon1, lat2, lon2, unit) {
  console.log("calculate distance");
  var radlat1 = Math.PI * lat1/180;
  var radlat2 = Math.PI * lat2/180;
  var radlon1 = Math.PI * lon1/180;
  var radlon2 = Math.PI * lon2/180;
  var theta = lon1-lon2;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit=="K") { dist = dist * 1.609344; }
  if (unit=="N") { dist = dist * 0.8684; }
  return dist;
}