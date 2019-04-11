 Function.prototype.compose = function (prevFunc) {
    var nextFunc = this; //the compose function
    return function() {
        return nextFunc.call(this,prevFunc.apply(this,arguments));
    }
}

Function.prototype.sequence = function (prevFunc) {
    var nextFunc= this;
    return function() {
        return prevFunc.call(this, nextFunc.apply(this,arguments));
    }
}


export default Function;