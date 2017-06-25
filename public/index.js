var socket = io();
var map;
var locButton = $('#send-location');

// GeoJSON, describing the locations and names of some cities.
var cities = {
	type: 'FeatureCollection',
	features: [{
		type: 'Feature',
		geometry: {type: 'Point', coordinates: [-87.650, 41.850]},
		properties: {name: 'Chicago'}
	}, {
		type: 'Feature',
		geometry: {type: 'Point', coordinates: [-149.900, 61.218]},
		properties: {name: 'Anchorage'}
	}, {
		type: 'Feature',
		geometry: {type: 'Point', coordinates: [-99.127, 19.427]},
		properties: {name: 'Mexico City'}
	}, {
		type: 'Feature',
		geometry: {type: 'Point', coordinates: [-0.126, 51.500]},
		properties: {name: 'London'}
	}, {
		type: 'Feature',
		geometry: {type: 'Point', coordinates: [28.045, -26.201]},
		properties: {name: 'Johannesburg'}
	}, {
		type: 'Feature',
		geometry: {type: 'Point', coordinates: [15.322, -4.325]},
		properties: {name: 'Kinshasa'}
	}, {
		type: 'Feature',
		geometry: {type: 'Point', coordinates: [151.207, -33.867]},
		properties: {name: 'Sydney'}
	}]
};

socket.on('connect', function() {
	console.log("Connected to server");
	// socket.emit('createMessage', {
	// 	from: 'ElanGO',
	// 	text: 'Hello from client'
	// })
})

socket.on('disconnect', function() {
	console.log("Disconnected from server");
})

socket.on('toClient', function(obj) {
	var li = $('<li></li>');
	li.text(`${obj.recdAt} - ${obj.from}: ${obj.text}`);
	$('#recd-messages').append(li);
})
socket.on('userLoc', function(obj) {
	addMarker(obj.lat, obj.lng);
})

$('#send-form').on('submit', function(e) {
	e.preventDefault();
	socket.emit('fromClient', {
	from: 'Elango',
	text: $('[name=message]').val()
	});
});

function initMap() {
	var myLocation = new google.maps.LatLng(13, 78);

	map = new google.maps.Map(document.getElementById('map'), {center: myLocation,zoom: 2});

	map.data.setStyle(function(feature) {return {title: feature.getProperty('name'),optimized: false};});

    map.data.addGeoJson(cities);
};
function addMarker(lat, lng) {
	var loc = {lat: lat, lng: lng};
	new google.maps.Marker({
		position: loc, 
		map: map, 
		title: 'Hello World!'
	})
};
locButton.on('click', function() {
	if(!navigator.geolocation) {
		console.log("Location mapping not supported on this client");
	}
	navigator.geolocation.getCurrentPosition(function (position){
		socket.emit('clientLoc', {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		});
	}, function () {
		alert('you have not authorized to capture your location');
	});
});
