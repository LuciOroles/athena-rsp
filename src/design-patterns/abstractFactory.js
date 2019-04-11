
let KingJoffery = (function(){
    function KingJoffery() {

    }
    KingJoffery.prototype.makeDecision = function () {

    }
    KingJoffery.prototype.marry = function () {

    }
    return KingJoffery;
})();

let LordTywin = (function(){
    function LordTywin() {

    }
    LordTywin.prototype.makeDecision = function() {

    };
    return LordTywin;
})();


let LannisterFactory = (function(){
    function LannisterFactory() {

    }
    LannisterFactory.prototype.getKing = function() {
        return new KingJoffery();
    }
    LannisterFactory.prototype.getHandOfTheKing = function () {
        return new LordTywin();
    }
    return LannisterFactory;
})();

/**
 * CourtSession = abstract factory
 * Creating a kit of objects, which work together, is useful in a number of situations; any time a group of objects need to collaborate to provide functionality but may need to be replaced wholesale
 */
let CourtSession = (function(){
    function CourtSession(abstractFactory) {
        this.abstractFactory= abstractFactory;
        this.COMAPLAIN_THRESHOLD = 10;
    }
    CourtSession.prototype.complainPreseted = function(complain) {
        if (complain.severity < this.COMAPLAIN_THRESHOLD) {
            this.abstractFactory.getHandOfTheKing().makeDecision();
        }
        else {
            this.abstractFactory.getKing().makeDecision();
        }
    }
    return CourtSession;
})();


let BBconstr = ( function() {
    function BB() {
        this.v = 'BB';
    }
    BB.prototype.add100= function () {
        this.v+= Math.floor(Math.random()*100);
    }
    BB.prototype.getV = function () {
        return this.v;
    }
    return BB;
} )();

let Bi =new BBconstr();
    Bi.add100();
console.log( Bi.getV() , KingJoffery );

let courtSession1 = new CourtSession( new LannisterFactory() ) ;
courtSession1.complainPreseted({severity: 8});
courtSession1.complainPreseted({severity: 22});

export default function () {
    console.log( ' abstract factory fn' );
}