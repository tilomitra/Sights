
YUI().use('shot-list', function (Y) {

    var shotList = new Y.Sights.ShotList(); 

    shotList.load(function(e) {
        SIGHTS.modelList = shotList;
        var Page = WinJS.UI.Pages.get('/pages/groupedMaster/groupedMaster.html');
        var page = new Page();
        page.ready();
    });


});