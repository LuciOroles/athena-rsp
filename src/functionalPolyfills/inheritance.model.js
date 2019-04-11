var Polygon= function (n) {
    this.numSides =n;
}

var Rectangle = function (w, l) {
    this.width=w;
    this.length=l;
}

Rectangle.prototype = Object.create(Polygon.prototype);

Rectangle.prototype.constructor= Rectangle;

Rectangle.prototype.numSides = 4;
Rectangle.prototype.getArea = function() {
    return this.width + this.length;
}

var Square = function (w) {
    this.width=w;
    this.length=w;
}

var s = new Square(5);

console.log(s.getArea());