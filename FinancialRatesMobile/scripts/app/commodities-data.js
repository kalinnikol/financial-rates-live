var app = app || {};

(function(a) {
    var previous = [];
    var prevC = 0;
    function getCommoditiesData() {
        var rand = Math.random();
        httpRequest.getJSON("http://marketools.plus500.com/Feeds/UpdateTable?instsIds=" + "10,11,12,116,118,123,1460,1462" + "&rand=" + rand)
        .then(function(data) {
            var test = JSON.stringify(data.Feeds);
            var obj = jQuery.parseJSON(test);
            if (prevC===0) {
                previous = obj;
                prevc = 1;
            }
            var counter = 0;
            var divToAdd = "<div>";
            var bStyle = "";
            obj.forEach(function(parsed) {
                parsed.I = transformI(parsed.I);
                
                if (parsed.S === obj[counter].S) {
                    bStyle = "style=" + "color:DeepSkyBlue; " + "font-weight: bold";
                }
                else if (parsed.S < obj[counter].S) {
                    bStyle = "style=" + "color:Red";
                }
                else if (parsed.S > obj[counter].S) {
                    bStyle = "style=" + "color:Green";
                }
                
                var added = "<div>" + parsed.I + "</div>" + "<div>Buy Price:" + "<span " + bStyle + ">" + parsed.S + "</span>" + "</div>" +
                            "<div>Sell Price:" + "<span " + bStyle + ">" + parsed.B + "</span>" + "</div>" + "<div>Change Percentage:" + parsed.P + "</div>" + "<br />";
                divToAdd = divToAdd + added;
                counter = counter + 1;
            });
            divToAdd = divToAdd + "</div>";
            var testDiv = $('#commoditiesRates');
            testDiv.html(divToAdd);
            previous = obj;
        });
    }
    
    setInterval(getCommoditiesData, 800);
    
    function transformI(data) {
        if (data == 10) {
            return "Oil";
        }
        if (data == 11) {
            return "Gold";
        }
        if (data == 12) {
            return "Silver";
        }
        if (data == 116) {
            return "Sugar";
        }
        if (data == 118) {
            return "Corn";
        }
        if (data == 123) {
            return "Natural Gas";
        }
        if (data == 1460) {
            return "Soybeans";
        }
        if (data == 1462) {
            return "Copper";
        }
        return "null"
    }
    
    var viewModel = kendo.observable({
        getData:getCommoditiesData
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        if (!checkConnection.check()) {
            navigator.notification.alert("Please connect to Internet", function() {
            })
        }
        else {
            getCommoditiesData();
        }
    }   
    
    a.commodities = {
        init:init          
    };
}(app));