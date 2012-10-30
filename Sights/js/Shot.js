YUI.add('shot', function (Y, name) {

    // Create a new Y.Shot class that extends Y.Model.
    Y.namespace('Sights').Shot = Y.Base.create('shot', Y.Model, [], {
        
        getComments: function (callback) {

            var url = 'http://api.dribbble.com/shots/' + this.get('id') + '/comments',
                query = "select * from json where url='" + url + "'";

            Y.YQL(query, function (r) {

                callback(r.query.results.json);

            });
        },

        getRelatedShots:  function (callback) {
            var url = 'http://api.dribbble.com/' + this.get('player').username + '/shots',
                query = "select * from json where url='" + url + "'";

            Y.YQL(query, function (r) {
                callback(r.query.results.json);
            });
        }

    }, {
        ATTRS: {
            group: {},
            id: {},
            title: item.title,
            teaser: {},
            image: {},
            backgroundImage: {},
            width: {},
            height: {},
            likes_count: {},
            player: {}
        }
    });
}, '1.0',  { requires: ['model', 'yql']});
