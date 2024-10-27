function searchNearby() {
    var location = map.getCenter();

    var request = {
        location: location,
        radius: '300',
        type: ['parking']
    };

    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearMarkers();

            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    });
}
