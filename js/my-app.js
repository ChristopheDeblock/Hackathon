// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('services', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
          var markers = [];
        $.getJSON( "http://data.drk.be/kortrijk/sport_outdoorlocaties.json", function( data ) {
              $.each( data.sport_outdoorlocaties, function( key, val ) {
                markers.push([
                    data.sport_outdoorlocaties[key].benaming,
                    data.sport_outdoorlocaties[key].lat,
                    data.sport_outdoorlocaties[key].long]);
              });


                    var bounds = new google.maps.LatLngBounds();
        var mapOptions = {
          center: { lat: 50.806905141279, lng: 3.3014492766399},
          zoom: 11
        };
        var map = new google.maps.Map(document.getElementById('map'),
            mapOptions);
    
        for( i = 0; i < markers.length; i++ ) {
            var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: markers[i][0]
            });
        }

              console.log(markers[0][1]);
        });
/*
        var markers = [
            ['Sportcampus Lange Munte', 50.806905141279,3.3014492766399],
            ['Sportcampus Olympiadeplein', 50.802252638944 ,3.2227871820652]
        ];
        */
        //var myLatlng = new google.maps.LatLng(50.806905141279,3.3014492766399);

            /*
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title:"Hello World!"
        });
*/
      //google.maps.event.addDomListener(window, 'load', initialize);
    /*
    //Google maps API initialisation
    var element = document.getElementById("map");
    console.log('init googlemaps');
    var map = new google.maps.Map(element, {
        center: new google.maps.LatLng(57, 21),
        zoom: 3,
        mapTypeId: "OSM",
        mapTypeControl: false,
        streetViewControl: false
    });

    //Define OSM map type pointing at the OpenStreetMap tile server
    map.mapTypes.set("OSM", new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            //var coord = {};
            //coord.x = 50.806905141279;
            //coord.y = 3.3014492766399;
            var url = "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
            console.log(url);
            return url;
        },
        tileSize: new google.maps.Size(256, 256),
        name: "OpenStreetMap",
        maxZoom: 18
    }));
*/


});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}