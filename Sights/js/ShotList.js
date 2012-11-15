
YUI().add('shot-list', function (Y, name) {

    var ShotList = Y.Base.create('shot-list', Y.ModelList, [Y.ModelSync.YQL], {
        query: "SELECT * FROM yql.query.multi WHERE queries=\"select * from json where url='http://api.dribbble.com/shots/popular'; select * from json where url='http://api.dribbble.com/shots/everyone';  select * from json where url='http://api.dribbble.com/shots/debuts'\"",
        model: Y.Sights.Shot,
        groups: [
            { key: "everyone", title: "Recent Shots", subtitle: "The global shots feed.", backgroundImage: '', description: '' },
            { key: "popular", title: "Popular", subtitle: "The cream of the crop on Dribbble.", backgroundImage: '', description: '' },
            { key: "debuts", title: "Debuts", subtitle: "New kids on the block.", backgroundImage: '', description: '' },
        ],
        parse : function (r) {
            var popular = r.results[0].json.shots,
                everyone = r.results[1].json.shots,
                debuts = r.results[2].json.shots,
                arr = [];
                

            //arr = arr.concat(popular).concat(everyone).concat(debuts);
            arr = arr.concat(this.classify(popular, 'popular')).concat(this.classify(everyone, 'everyone')).concat(this.classify(debuts, 'debuts'));

            return arr;
        },

        classify: function (shotsArr, type) {
            var groupId,
                arr = [],
                self = this,

            addToShots = function (arr, groupId) {

                var a = [];

                Y.Array.each(shotsArr, function (item, index, array) {

                    var o = {
                        group: self.groups[groupId],
                        id: item.id,
                        title: item.title,
                        teaser: item.image_teaser_url,
                        image: item.image_url,
                        width: item.width,
                        height: item.height,
                        likes_count: item.likes_count,
                        player: item.player
                    };
                    a.push(new Y.Sights.Shot(o));
                    //self.get('list').push(o);
                });

                return a;
            }

            switch (type) {
                case "everyone":
                groupId = 0;
                arr = addToShots(shotsArr, groupId);
                break;

                case "popular":
                groupId = 1;
                arr = addToShots(shotsArr, groupId);
                break;

                case "debuts":
                groupId = 2;
                arr = addToShots(shotsArr, groupId);
                break;
            }

            return arr;
        }

    }, {
        ATTRS : {
            //reference to a new WinJS.Binding.List()
            list: {}
        }
    });

    Y.namespace('Sights').ShotList = ShotList;
}, '1.0',  { requires: ['model-list', 'model-sync-yql', 'shot']});

