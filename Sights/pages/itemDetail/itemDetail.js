YUI().use('node', 'yql','masonry', 'shot', function (Y) {

    var ui = WinJS.UI;
    var utils = WinJS.Utilities,

        displayComments = function (results) {
            var source = Y.one('#comments-template').getHTML(),
                i,
                html = '',
                len = (results.comments) ? results.comments.length : results.total,
                o,

                getHTML = function (o, i) {
                    var s = Y.Lang.sub(source, {
                        avatar_url: o.player.avatar_url,
                        name: o.player.name,
                        location: o.player.location,
                        body: o.body,
                        classname: (i % 2 === 0) ? 'first' : 'second'
                    });
                    return s;
                };

            if (len > 1) {
                for (var i = 0; i < len; i++) {
                    o = results.comments[i];
                    html += getHTML(o, i);

                }
            }
            else if (len === 1) {
                o = results.comments;
                html += getHTML(o);
            }

            Y.one('.comment-list').append(html);

            var masonry = new Y.Masonry({
                node: '.comment-list',
                itemSelector: '.comment'
            });

        },

        displayShotsFromPlayer = function (results) {
            var source = Y.one('#shots-template').getHTML(),
                i,
                html = '',
                len = (results.shots.length > 9) ? 9 : results.shots.length;

            for (var i = 0; i < len; i++) {
                var o = results.shots[i];

                html += Y.Lang.sub(source, {
                    teaser_url: o.image_teaser_url
                });
            }
            Y.one('.shots-list').append(html);
        };

        ui.Pages.define("/pages/itemDetail/itemDetail.html", {
            // This function is called whenever a user navigates to this page. It
            // populates the page elements with the app's data.
            ready: function (element, options) {
                var item = options && options.item ? Data.resolveItemReference(options.item) : Data.items.getAt(0);
                var shot = new Y.Sights.Shot(item);
                Y.one('.titlearea .pagetitle').setHTML(item.group.title);
                Y.one(".item-title").setHTML(item.title);
                Y.one(".item-subtitle").setHTML(item.subtitle);
                Y.one(".item-image").setAttribute('src', item.image);
                Y.one(".item-image").setAttribute('alt', item.subtitle);
                Y.one(".item-content").setHTML(item.content);
                Y.one(".content").focus();

                shot.getComments(displayComments);
                shot.getRelatedShots(displayShotsFromPlayer);
            }
        });

});