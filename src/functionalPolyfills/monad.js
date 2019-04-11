const MonadB =  function MonadB() {
    var prototype = Object.create(null);
    function unit(value) {
        var monad = Object.create(prototype);
        monad.bind = function(func, args) {
            return func(value, ...args);
        }
        return monad;
    }

    // unit.method = function (name, func) {
    //     prototype[name] = func;
    //     return unit;
    // };
    unit.lift = function (name, func) {
        prototype[name] = function(...args) {
            return unit(this.bind(func, args));
        }
        return unit;
    }

    return unit;
}

const Monad = function Monad() {
    //this is the identity monad
    return function unit(value) {
        var monad = Object.create(null);
            monad.bind = function (func) {
                return func (value);
            }
        return monad;
    }
}


export  {Monad, MonadB} 