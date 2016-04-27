
var dummy_data_generator = {

  'reset' : function() {
    Crimes.remove_all();
  },

  'get_dummy_crime': function() {
    var rnd_id = (new Date).getTime();
    var crime = {
      crime_id : rnd_id,
      name : Faker.Company.companyName(),
      address: Faker.Address.streetAddress(),
      pos: {lat: 40.742 + Math.random(), lon: -74.179 + Math.random()}
    };

    crime.descr = '<div>'+
    '<div>'+
    '</div>'+
    '<h2>' + crime.name + ' <small>' + crime.address +  '</small></h2>'+
    '<div>'+
    '<img style="width:200px;height:200px;float:left;margin:5px 10px 5px 0px" src="http://lorempixel.com/200/200/" />' +
    '<p>' + Faker.Lorem.paragraph() + '</p>' +
    '<p>' + Faker.Lorem.paragraph() + '</p>' +
    '<p>' + Faker.Lorem.paragraph() + '</p>' +
    '</div>'+
    '</div>';

    return crime;
  },

  'repopulate' : function() {
    Crimes.remove_all();
    for (var i = 0, l = 10; i < l ;  i++) {
      Crimes.add_new(this.get_dummy_crime());
    }
  }
};

dummy_data_generator.repopulate();
