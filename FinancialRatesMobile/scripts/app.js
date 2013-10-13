var app = app || {};

(function() {
    
    document.addEventListener("deviceready", function() {
        //app.servicesBaseUrl = "http://localhost:62354/api/";
        app.servicesBaseUrl = "http://marketools.plus500.com/Feeds/UpdateTable?instsIds=";
        
        var kendoApp = new kendo.mobile.Application(document.body);
    });
    
}());