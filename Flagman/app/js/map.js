var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 55.806132, lng: 37.583844},
        zoom: 15
    });
}