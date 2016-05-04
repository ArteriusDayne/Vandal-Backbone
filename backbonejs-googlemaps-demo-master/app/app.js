
// global for the sake of this example
var Crimes = new CrimeList();
var App = null;

/**
 * The App
 * Our overall **AppView** is the top-level piece of UI.
 */
var AppView = Backbone.View.extend({
    el: $("#hub"),
    //--------------------------------------
    // Event wiring (events and event handlers)

    events: {
        'click #btn_content': 'show_content',
        'click #btn_map': 'show_map'
    },
    show_content: function () { //triggers "content" mode
        var self = this;
        var top = 200;
        var speed = 600;

        // set content position and fade in
        self.main.animate({top: (top) + 'px'}, speed, function () {
            self.main.fadeIn();
        });

        self.crimes_holder.fadeOut();

        // controls to switch back to map
        self.controls.hide().css({top: (top - 100) + 'px'});
        setTimeout(function () {
            self.content_controls.fadeIn();
        }, 2 * speed);

        // resize map canvas
        self.map_canvas.animate({height: (top) + 'px'}, speed);
    },
    show_map: function () { // triggers "map" mode
        var self = this;
        var speed = 800;

        // hide content
        self.main.fadeOut();

        // hide controls
        self.controls.hide();

        self.crimes_holder.fadeIn();

        // resize map canvas. make map 100%
        self.map_canvas.animate({height: '100%'}, speed);

        setTimeout(function () {
            // show map controls
            self.map_controls.css({top: '80%'});
            self.map_controls.fadeIn();
        }, speed);
    },
    // END Events and event handlers
    //----------------------------------


    //--------------------------------------
    // Initialise map
    //--------------------------------------
    _initialize_map: function () {
        var Geomarker;
        var center = new google.maps.LatLng(40.742, -74.179);
        var styles = [
            {
                elementType: "geometry",
                stylers: [
                    {lightness: 33},
                    {saturation: -90}
                ]
            }
        ];

        var mapOptions = {
            draggable: true,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: center,
            styles: styles
        };

        this.map = new google.maps.Map(document.getElementById('map_canvas'),
                mapOptions);

        GeoMarker = new GeolocationMarker();
        GeoMarker.setCircleOptions({fillColor: '#808080'});

        google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function () {
            map.setCenter(this.getPosition());
            map.fitBounds(this.getBounds());
        });

        google.maps.event.addListener(GeoMarker, 'geolocation_error', function (e) {
            alert('There was an error obtaining your position. Message: ' + e.message);
        });

    },
    //--------------------------------------
    // Initialise app
    //--------------------------------------

    initialize: function () {
        var self = this;

        // cache DOM elements for faster access
        self.main = $('#main');
        self.controls = $('.nav_controls');
        self.content_controls = $('#content_controls');
        self.map_controls = $('#map_controls');
        self.map_canvas = $('#map_canvas');
        self.header = $('header');
        self.crimes_holder = $('#crimes_holder');

        // initialize map
        self._initialize_map();

        // Initial control positions
        // Move header up (out of window)
        self.header.css({top: '-1000px'});
        self.header.animate({top: '0px'}, 1500);

        // hide all controls
        self.controls.hide();
        self.controls.css({top: '80%'});

        // self.map_controls.fadeIn();
        setTimeout(function () {
            self.map_controls.fadeIn();
        }, 1000);

        setTimeout(function () { // fetch data with some delay
            Crimes.fetch();
            // create views
            var list_view = new CrimeListView({model: Crimes, map: self.map});
        }, 2000);
    }
});

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function () {
    App = new AppView();
});
