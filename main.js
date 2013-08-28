var location1;
var location2;

var startAdd;
var finishAdd;

var latlng;
var geocoder;
var map;

var distance;

	//Default address
	startAdd = new google.maps.LatLng(51.3353899, -0.742856);
	finishAdd = new google.maps.LatLng(51.5221993, -0.1097618);
   
   //Initializing the function which will calculate the as crow flies distance between to points.
function initialize()
{
     
     showMap(); //Calling the showMap function to load the map.

	var R = 6371; //Radius of earth im km
	var dLat = degtoRad(finishAdd.lat()-startAdd.lat()); //Changing latitude to radian
	var dLon = degtoRad(finishAdd.lng()-startAdd.lng()); //changing longitude to radain
	
	var dLat1 = degtoRad(startAdd.lat()); //Changing latitude of starting address radian
	var dLat2 = degtoRad(finishAdd.lat()); //Changing latitude of finishing address to radian
		
	// compute distance between the two points using Haversine formula.
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(dLat1) * Math.cos(dLat1) * 
			Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = Math.round(R * c) ; // Distance in KM
	var dm = Math.round(d * 0.62137) // Distance in Miles
			document.getElementById("distance").innerHTML = +d + " Kilometers or " + dm + " Miles.";
  
}

//function to change the degree to radian
function degtoRad(deg) 
{
	return deg * Math.PI/180;
}
	// creates and shows the map
function showMap()
	{
		// center of the map (compute the mean value between the two locations)
		latlng = new google.maps.LatLng((startAdd.lat()+finishAdd.lat())/2,(startAdd.lng()+finishAdd.lng())/2);
		
		// set map options
			// set zoom level
			// set center
			// map type
		var mapOptions = 
		{
			zoom: 10,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.DRIVING
		};
		
		// create a new map object
			// set the div id where it will be shown
			// set the map options
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		
		
		// show a line between the two points
		var line = new google.maps.Polyline({
			map: map, 
			path: [startAdd, finishAdd],
			strokeWeight: 7,
			strokeOpacity: 0.8,
			strokeColor: "#FF6666"
		});
		
		// create the markers for the two locations		
		var marker1 = new google.maps.Marker({
			map: map, 
			position: startAdd,
			title: "Starting Address"
		});
		var marker2 = new google.maps.Marker({
			map: map, 
			position: finishAdd,
			title: "Finish Address"
		});
		
		}	

google.maps.event.addDomListener(window, 'load', initialize);