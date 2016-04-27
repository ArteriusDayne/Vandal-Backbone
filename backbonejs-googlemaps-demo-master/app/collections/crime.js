
/**
 * Crime Collection
 * The collection of companies is backed by *localStorage* instead of a remote
 * server.
 */

var CrimeList = Backbone.Collection.extend({

  // reference to this collection's model.
  model: Crime,

  localStorage: new Store("company-cachirulo"),

  add_new: function(crime) {
    this.create(crime);
  },

  // companies are sorted by their name
  comparator: function(crime) {
    return crime.get('name');
  },

  remove_all: function() {
    var model;
    while (model = this.pop()) {
      model.destroy();
    }
  }
});