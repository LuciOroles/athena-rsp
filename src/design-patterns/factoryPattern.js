let Religion ={};
let WateryGod = (function(){
    function WateryGod() {

    }
    WateryGod.prototype.prayTo = function () {

    };
    return WateryGod;
})();

Religion.WateryGod = WateryGod;

let AncientGods = (function(){
    function AncientGods() {

    }
    AncientGods.prototype.prayTo = function () {

    };
    return AncientGods;
})();

Religion.AncientGods = AncientGods;

let DefaultGod = (function(){
    function DefaultGod() {

    }
    DefaultGod.prototype.prayTo = function () {

    };
    return DefaultGod;
})();

Religion.DefaultGod = DefaultGod;

let GodFactory = (function(){
    function GodFactory() {

    }
    GodFactory.Build = function (goodName) {
        if (goodName = "watery") {
            return new WateryGod();
        }
        if (goodName = "ancient") {
            return new AncientGods();
        }
        return DefaultGod();
    }
    return GodFactory;
})();

let GodDeterminant = (function(){   
        function GodDeterminant(religionName, prayerPurpose) {
            this.religionName = religionName;
            this.prayerPurpose = prayerPurpose;
        }
        return GodDeterminant
})();

let Prayer = (function(){
    function Prayer() {

    }
    Prayer.prototype.pray = function(godName) {
        GodFactory.Build(godName).prayTo();
    }

    return Prayer;
})();