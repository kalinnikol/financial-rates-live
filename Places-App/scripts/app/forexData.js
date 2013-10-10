var app = app || {};

(function(a) {

    function getData() {
      httpRequest.getJSON("http://marketools.plus500.com/Feeds/UpdateTable?instsIds="+"2,4,16,17,27")
        .then(function(data) {
             var test=JSON.stringify(data.Feeds);
            var obj = jQuery.parseJSON(test);
            var divToAdd="<div>";
            obj.forEach(function(parsed){
                parsed.I=transformI(parsed.I);
                var added="<div>"+parsed.I+"</div>"+"<div>Buy Price:"+parsed.S+"</div>"+
                "<div>Sell Price:"+parsed.B+"</div>"+"<div>Change Percentage:"+parsed.P+"</div>"+"<br />";
                divToAdd=divToAdd+added;
            });
            divToAdd=divToAdd+"</div>";
            var testDiv=$('#test');
            testDiv.html(divToAdd);
        });
    }
    
    function transformI(data){
        if(data==2)
        {
            return "EUR/USD";
        }
        if(data==4)
        {
            return "GBP/USD";
        }
        if(data==16)
        {
            return "USD/JPY";
        }
        if(data==17)
        {
            return "USD/CHF";
        }
        if(data==27)
        {
            return "EUR/JPY";
        }
        return "null"
    }
    
    var viewModel = kendo.observable({
        getData:getData
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
       //getAlphabetically();
    }   
    
    a.forex = {
        init:init          
    };
}(app));