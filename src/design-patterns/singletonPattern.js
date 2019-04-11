let Westeros;
(function (Westeros) {
    var Wall = (function () {
        function Wall() {
            this.height = 0;
            if (Wall._instance) return Wall._instance;
            Wall._instance = this;
        }
        Wall.prototype.setHeight = function (height) {
            this.height = height;
        }
        Wall.prototype.getStatus = function {
            return "The wall is " + this.height + " meeters tall";
        }
        Wall.getInstance = function () {
            if (!Wall._instance) {
                Wall._instance = new Wall();
            }
        }
        Wall._instance = null;
        return Wall;
    })();

    Westeros.Wall = Wall;
})(Westeros || (Westeros = {}))