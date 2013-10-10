var app = app || {};

(function(a) {
    /*function getAllPlaces(options){
    httpRequest.getJSON(app.servicesBaseUrl  + "places")
    .then(function(places){
    ret
    });
    }*/
    function getAlphabetically() {
        httpRequest.getJSON("http://marketools.plus500.com/Feeds/UpdateTable?instsIds=2")
        .then(function(data) {
        var test = JSON.stringify(data);
            var obj= JQuery.parseJSON(test);
            var t = 5;
            var testDiv = $('#test');
            testDiv.html(test);
        });
    }
    
    function getByLocation() {
        cordovaExt.getLocation().
        then(function(location) {
            var locationString = location.coords.latitude + "," + location.coords.longitude;            
            return httpRequest.getJSON(app.servicesBaseUrl  + "places?location=" + locationString);     
        })
        .then(function(places) {
            viewModel.set("places", places); 
            console.log(places);
        });
    }
    
    var viewModel = kendo.observable({
        getAlphabetically: getAlphabetically,
        getByLocation: getByLocation
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
       //getAlphabetically();
    }   
    
    a.places = {
        init:init          
    };
}(app));