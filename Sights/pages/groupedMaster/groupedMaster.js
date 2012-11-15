YUI().use('node', 'grid-view', 'event-tap', 'transition', function (Y) {
        var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;


    var page = ui.Pages.define("/pages/groupedMaster/groupedMaster.html", {
            // This function is called whenever a user navigates to this page. It
            // populates the page elements with the app's data.
            ready: function (element, options) {

                var gridView = new Y.Sights.GridView({modelList: SIGHTS.modelList});

                gridView.on('render', function (e) {
                    Y.one('.grid-view').delegate('tap', function (e) {
                        var clientId = e.currentTarget.getAttribute('data-modelid'),
                        model = SIGHTS.modelList.getByClientId(clientId);
                        nav.navigate("/pages/itemDetail/itemDetail.html", { item: model.toJSON() });
                    }, '.item-container', this);

                    window.setTimeout(function () {
                        Y.one('.grid-view').addClass('active');
                    }, 300);
                    
                });
                gridView.render();

            }
        });
});