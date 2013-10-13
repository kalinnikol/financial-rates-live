window.checkConnection = (function() {
    function check() {
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.NONE] = 'No network connection';
        
        if(states[networkState]=='Unknown connection' || states[networkState]=='No network connection'){
            return false;
        }
       
            return true;
        
    }
    
    return {
       check: check
    }
}());