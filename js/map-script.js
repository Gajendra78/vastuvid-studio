/* --------------------------------------------
Google Map Initialization Script
-------------------------------------------- */	
window.onload = MapLoadScript;

function GmapInit() {
    var Gmap = $('.map-canvas');
    
    Gmap.each(function() {
        var $this = $(this),
            lat = parseFloat($this.data('lat')) || 30.280058,  // Default latitude
            lng = parseFloat($this.data('lng')) || 78.029767, // Default longitude
            zoom = parseFloat($this.data('zoom')) || 12,
            scrollwheel = $this.data('scrollwheel') !== undefined ? $this.data('scrollwheel') : false,
            zoomcontrol = $this.data('zoomcontrol') !== undefined ? $this.data('zoomcontrol') : true,
            draggable = !navigator.userAgent.match(/iPad|iPhone|Android/i),
            mapType = getMapType($this.data('type')),
            title = $this.data('title') || '',
            contentString = $this.data('content') ? '<div class="map-data"><h6>' + title + '</h6><div class="map-content">' + $this.data('content') + '</div></div>' : '',
            themeIconPath = $this.data('icon-path');

        var mapOptions = {
            zoom: zoom,
            scrollwheel: scrollwheel,
            zoomControl: zoomcontrol,
            draggable: draggable,
            center: new google.maps.LatLng(lat, lng),
            mapTypeId: mapType
        };

        var map = new google.maps.Map($this[0], mapOptions);
        
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
            icon: themeIconPath,
            title: title
        });

        if (contentString) {
            var infowindow = new google.maps.InfoWindow({ content: contentString });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        }

        setMapStyles(map, $this.data('hue'));
    });
}

function getMapType(type) {
    switch (type) {
        case 'satellite':
            return google.maps.MapTypeId.SATELLITE;
        case 'hybrid':
            return google.maps.MapTypeId.HYBRID;
        case 'terrain':
            return google.maps.MapTypeId.TERRAIN;
        default:
            return google.maps.MapTypeId.ROADMAP;
    }
}

function setMapStyles(map, hue) {
    if (hue !== undefined && hue !== false) {
        var styles = [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    { "saturation": 36 },
                    { "color": "#000000" },
                    { "lightness": 40 }
                ]
            },
            // Additional style rules...
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    { "color": "#000000" },
                    { "lightness": 17 }
                ]
            }
        ];
        map.setOptions({ styles: styles });
    }
}

function MapLoadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=GmapInit'; // Replace with your Google Maps API key
    document.body.appendChild(script);
}
