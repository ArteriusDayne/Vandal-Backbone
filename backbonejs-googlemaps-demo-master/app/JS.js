/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Surfboard Model
var SurfboardsView = Backbone.View.extend({
    defaults: {
        manufacturer: '',
        model: '',
        stock: 0
    }
});

//board1 instance
var board1 = new Surfboard({
    manufacturer: "Channel Islands",
    modeL: 'Whip',
    stock: 12
});

//Create collection
var SurfboardsCollection = Backbone.Collection.extend({
    model: Surfboard
});

//Collection + model instances
var Surfboards = new SurfboardsCollection;
Surfboards.add(board1);

//Surfboards View
var SurfboardsView = Backbone.View.extend({
    el: '#table-body',
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html('');

        Surfboards.each(function (model) {
            var surfboard = new SurfboardView({
                model: mode
            });

            this.$el.append(surfboard.render().el);
        }.bind(this));

        return this;
    }

});

//Surfboard View
var SurfboardView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#surfboard-template').html()),
    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }

});

// Launch app
var app = new SurfboardsView;