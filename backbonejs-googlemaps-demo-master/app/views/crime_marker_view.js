
/**
 * Crime Marker View
 * The DOM element for a crime marker.
 */

var CrimeMarkerView = Backbone.View.extend({

    tagName:  "li",

    initialize: function(options) {

      var self = this;

      self.model = options.model;
      self.model.on('remove', self.remove, self);

      self.map = options.map;

      var pos = self.model.get('pos');

      self.marker = new google.maps.Marker({
          map: self.map,
          position: new google.maps.LatLng(pos.lat, pos.lon),
          animation: google.maps.Animation.DROP,
          icon : 'img/crime.png',
          title: self.model.name,
          descr : self.model.get('descr'),
          id : self.model.get('crime_id')
      });

      self.marker.infowindow = new google.maps.InfoWindow({
        content: self.marker.descr
      });

      google.maps.event.addListener(self.marker, 'mouseover', self.show_crime_info);
      google.maps.event.addListener(self.marker, 'mouseout', self.hide_crime_info);
      google.maps.event.addListener(self.marker, 'click', self.show_crime_detail);
    },

    //---------------------------------------
    // Event handlers for marker events

    show_crime_detail : function() {
      this.infowindow.close();
      App.show_content();
    },

    hide_crime_info : function() {
      this.setIcon('img/crime.png');
      this.infowindow.close();
    },

    show_crime_info : function() {
      this.setIcon('img/crime.png');
      this.infowindow.open(this.map, this);
    },

    // END Events and event handlers
    //----------------------------------

    render: function() { },

    remove : function() {
      this.marker.setMap(null);
      this.marker = null;
    }
});
