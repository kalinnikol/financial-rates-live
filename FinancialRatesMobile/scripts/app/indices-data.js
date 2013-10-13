var app = app || {};

(function(a) {
    var previous = [];
    var prevC = 0;
    function getIndicesData() {
        var rand = Math.random();
        httpRequest.getJSON("http://marketools.plus500.com/Feeds/UpdateTable?instsIds=" + "85,89,432,295,19,18,95" + "&rand=" + rand)
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
            var testDiv = $('#indicesRates');
            testDiv.html(divToAdd);
        });
    }
    
    setInterval(getIndicesData, 800);
    
    function transformI(data) {
        if (data == 85) {
            return "USA 30";
        }
        if (data == 89) {
            return "UK 100";
        }
        if (data == 432) {
            return "Germany 30";
        }
        if (data == 295) {
            return "Italy 40";
        }
        if (data == 19) {
            return "US-TECH 100";
        }
        if (data == 18) {
            return "USA 500";
        }
        if (data == 95) {
            return "Japan 225";
        }
        return "null"
    }
    
    var viewModel = kendo.observable({
        getData:getIndicesData
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        if (!checkConnection.check()) {
            navigator.notification.alert("Please connect to Internet", function() {
            })
        }
        else {
            getIndicesData();
        }
    }   
    
    a.indices = {
        init:init          
    };
}(app));