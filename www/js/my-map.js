//....initMap function (Google Maps API)....//
function initMap() {
  var currentLocation = { lat: latitude, lng: longitude };

  var map = new google.maps.Map(document.getElementById("map"),
    {
      zoom: 18,
      center: currentLocation
    });

  //I added the animation to the Marker
  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: { lat: latitude, lng: longitude }
  });
  marker.addListener('click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}





