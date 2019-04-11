function identityf(x) {
    return function () {
        return x;
    }
}

function addf(first) {
    return function(second) {
        return first+second;
    }
}

function liftf(binary) {
    return function(first) {
        return function(second) {
            return binary(first, second);
        }
    }
}

function applyf(binary) {
    return function (a) {
            return binary(a); // this will return a fn that expects a new arg
    }
}

function zcurry(binary, e) {
    return function (b) {
        return binary(e,b);
    }
}

function twice(binary) {
    return function(y) {
        return binary(y,y);
    }
}

function composeu(f, g) {
    return function(a) {
        return g(f(a));
    }
}

function composeb(f,g) {
    return function (a, b, c) {
        return g(f(a,b),c);
    }
}

function once(func) {
    return function() {
        var f= func;
        func = null;
        return f.apply(this, arguments);
    }
}

function counterf(value) {
    return  {
        inc: function() {
            value+=1;
            return value;
        },
        dec: function () {
            value-=1;
            return value;
        }
    }
}

function revocable(func) {
    return {
        invoke: function() {
            return func.apply(this,arguments); // any number of arguments passed to invoke will be pushed to func
        },
        revoke: function() {
            func=null;
        }
    }
}

export { identityf,  addf, liftf, applyf, zcurry ,twice, composeu, composeb, once, counterf , revocable } 