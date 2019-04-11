// old interface

function Shipping() {
    this.request = function (zipStart, zipEnd, weight) {
        //...
        return '$49.75';
    }
}

function AdvancedShipping() {
    this.login = function (credentials) {};
    this.setStart = function (start) { };
    this.setDestination = function (destination) {};
    this.calculate = function (weight) { return "$39,59"}
}

function ShippingAddapter(credentials) {
    var shipping= new AdvancedShipping();
    shipping.login(credentials);

    return {
        request: function (zipStart, zipEnd, weight) {
            shipping.setStart(zipStart);
            shipping.setDestination(zipEnd);
            return shipping.calculate(weight)
        }
    }
}


var log = (function(){
    var log="";

    return {
        add : function (msg) {
            log+= msg+ "\n";
        },
        show: function() {
            console.log(log);
            log="";
        }
    };
})();


function run() {
    var shipping = new Shipping(); //core old interface
    var credentials= {token : 'x2a-331.1ppPae'};
    var adapter = new ShippingAddapter(credentials);

    var cost = shipping.request('214', '122', '2kg');

    log.add("old cost " + cost); // shipping request

    cost = adapter.request('213', '221', '2kg');

    log.add("new cost " + cost);
    log.show();
}


export default run;