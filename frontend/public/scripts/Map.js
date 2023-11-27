export function createMap(id){
    var map = L.map(id).setView([-7.761728519274012, 110.23037834124277], 14 + 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var myIcon = L.divIcon({className: 'my-div-icon'});
    L.marker([-7.761728519274012, 110.23037834124277], {icon: myIcon}).addTo(map);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            //grades = [0, 10, 20, 50, 100, 200, 500, 1000],
            grades = [0, 12, 25, 37, 50, 62, 75, 87], //pretty break untuk 8
            labels = [],
            from, to;

        for (var i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];

            labels.push(
                '<i style="background:' + '#FFFFFF' + '"></i> ' +
                from + (to ? '&ndash;' + to : '+'));
        }

        // div.innerHTML = '<h4 style="background-color:blue;">Legenda:</h4><br>'+labels.join('<br>');
        div.innerHTML = `<div class="rounded" id="uav_status" style="background-color: #2b2b2b; height: 15vh; width:8vw; padding-top: 1vh;">
                            Altitude<br><span id="altitude_status">-</span><br>Latitude<br><span id="latitude_status">-</span>
                            <br>Longitude<br><span id="longitude_status">-</span></div>`;
        return div;
    };

    legend.addTo(map);

    var planeIcon = L.icon({
        iconUrl: '/images/plane.png',
        iconSize:     [60, 60], // size of the icon
        iconAnchor:   [30, 30], // point of the icon which will correspond to marker's location
    });

    var fireIcon = L.icon({
        iconUrl: '/images/fire_icon.png',
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    });

    const planeMarker = L.marker([-7.761728519274012, 110.23037834124277], {icon: planeIcon, rotationAngle:0}).addTo(map);

    const latlon = [-7.761728519274012, 110.23037834124277];

    var polylinePoints = [];            
    
    const polyline = L.polyline(polylinePoints).addTo(map);     

    const fireMarkers = [];
    function createFireMarker(lat, lon){
        const fireMarker = L.marker([lat, lon], {icon: fireIcon}).addTo(map);
        fireMarkers.push(fireMarker);
    }

    return {map: map, planeMarker: planeMarker, planeTrack: polyline, fireMarkers: fireMarkers, createFireMarker: createFireMarker};
}

export function rad_to_deg(radians)
{
    var pi = Math.PI;
    return radians * (180/pi);
}

export function updatePlane(plane, data){
    const last_data = data[data.length - 1];
    const last_latlon = plane.planeMarker.getLatLng();
    const lat = last_data.latitude;
    const lon = last_data.longitude;
    const latln = new L.LatLng(lat, lon);
    plane.planeMarker.setLatLng(latln);///
    const plane_angle = Math.atan2(latln.lng - last_latlon.lng, latln.lat - last_latlon.lat);
    plane.planeMarker.setRotationAngle(rad_to_deg(plane_angle));
    const altitude_status = document.getElementById("altitude_status");
    altitude_status.innerText= last_data.altitude.toFixed(2);
    const latitude_status = document.getElementById("latitude_status");
    latitude_status.innerText= lat.toFixed(6);
    const longitude_status = document.getElementById("longitude_status");
    longitude_status.innerText= lon.toFixed(6);
    // plane.planeTrack.addLatLng(latln);
    // plane.planeTrack = data.map((data) => new L.LatLng(data.latitude, data.longitude));
    plane.planeTrack.setLatLngs(data.map((data) => new L.LatLng(data.latitude, data.longitude)));
    if(last_data.fire) plane.createFireMarker(lat, lon);
    if(plane.planeTrack.getLatLngs().length > 20)
    {
        const latl = plane.planeTrack.getLatLngs();
        latl.shift();
        plane.planeTrack.setLatLngs(latl);
    }
    plane.map.setView(latln);
}