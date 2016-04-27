
/**
 * Crime List View
 * The DOM element for a list of crime items.
 */

var CrimeListView = Backbone.View.extend({

    el:  $("#crime_holder"),

    initialize: function(options) {
      this.map = options.map;
      this.model.on('add', this.added_crime, this);

      // initialize position
      this.$el.css({display: 'none', right:'20px', top: '120px'}, 2000);
      this.$el.fadeIn('500');

      this.list_container = $('#crime_list_holder ul', this.$el);

      this.render();
    },

    //----------------------------------
    // Events and event handlers

    events: {
      'click #btn_pop_new_crime': 'popup_new_crime',
      'click #btn_delete_all_crime' : 'delete_all_crime'
    },

    // event handler for "new crime" action
    popup_new_crime: function() {
      if (Crimes.length>15){
        alert('limited to 15!');
        return;
      }
      var crime = dummy_data_generator.get_dummy_company();
      this.model.add_new(crime);
    },

    // event handler for "delete all companies" action
    delete_all_crimes: function() {
      Crimes.remove_all();
    },

    // END Events and event handlers
    //----------------------------------

    added_crime : function(crime){
      var marker_view = new CrimeMarkerView({ model: crime, map: this.map });
      var item_view = new CrimeListItemView({ model: crime, marker_view : marker_view });
      $(this.list_container).append(item_view.render().el);
    },

    render: function() {
      this.model.each (this.added_crime, this);
    }
});