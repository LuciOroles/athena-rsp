
function clone (source, destination) {
    for (var attr in source.prototype) {
        destination.prototype[attr] = source.prototype[attr];
    }
}


var Westeros;
(function(Westeros){
    (function(Famillies){
        var Lannister = (function(){
            function Lannister() {}
            Lannister.prototype.clone= function () {
                var clone = new Lannister();
                for (var attr in this) {
                    clone[attr] = this[attr];
                }
                return clone;
            }
            return Lannister;
        })();
        Famillies.Lannister = Lannister;
    })(Westeros.Famillies || (Westeros.Famillies={}));
   var Famillies = Westeros.Famillies; 
})(Westeros || (Westeros= {}))


export default Westeros;