function continuize(unary) {
    return function(callback,arg) {
        return callback(unary(arg));// continous passing style
    }
}

function continuize6(any) {
    return function(callback, ...x) {
        return callback(any(...x));
    }
}


export { continuize, continuize6}