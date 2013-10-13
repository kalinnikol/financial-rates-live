var app = app || {};

(function(a) {
    var previous = [];
    var prevC = 0;
    function getSharesData() {
        var rand = Math.random();
        httpRequest.getJSON("http://marketools.plus500.com/Feeds/UpdateTable?instsIds=" + "20,514,886,6,1344,1350,1418" + "&rand=" + rand)
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
            var testDiv = $('#sharesRates');
            testDiv.html(divToAdd);
        });
    }
    
    setInterval(getSharesData, 800);
        
    function transformI(data) {
        if (data == 20) {
            return "Apple";
        }
        if (data == 514) {
            return "First Solar";
        }
        if (data == 886) {
            return "Zynga";
        }
        if (data == 6) {
            return "Google";
        }
        if (data == 1344) {
            return "Yelp";
        }
        if (data == 1350) {
            return "Facebook";
        }
        if (data == 1418) {
            return "Petropavlovsk";
        }
       
        return "null"
    }
    
    var viewModel = kendo.observable({
        getData:getSharesData,
        
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        if (!checkConnection.check()) {
            navigator.notification.alert("Please connect to Internet", function() {
            })
        }
        else {
            getSharesData();
        }
    }   
    
    a.shares = {
        init:init          
    };
}(app));