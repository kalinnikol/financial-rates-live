var app = app || {};

(function(a) {
    var previous = [];
    var prevC = 0;
    function getForexData() {
        var rand = Math.random();
        httpRequest.getJSON("http://marketools.plus500.com/Feeds/UpdateTable?instsIds=" + "2,4,16,17,27" + "&rand=" + rand)
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
            var testDiv = $('#forexRates');
            testDiv.html(divToAdd);
            previous = obj;
        });
    }
    
    setInterval(getForexData, 800);
    
    function transformI(data) {
        if (data == 2) {
            return "EUR/USD";
        }
        if (data == 4) {
            return "GBP/USD";
        }
        if (data == 16) {
            return "USD/JPY";
        }
        if (data == 17) {
            return "USD/CHF";
        }
        if (data == 27) {
            return "EUR/JPY";
        }
        return "null"
    }
    
    var viewModel = kendo.observable({
        getData:getForexData
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        if (!checkConnection.check()) {
            navigator.notification.alert("Please connect to Internet", function() {
            })
        }
        else {
            getForexData();
        }
    }   
    
    a.forex = {
        init:init          
    };
}(app));