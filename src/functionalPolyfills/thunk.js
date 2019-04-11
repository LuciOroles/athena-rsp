export default thunk =  function (fn) {
    return function() {
        var args = Array.prototype.slice.apply(arguments);
        return function() {
            console.log(`what is this: ${this}`);
            return fn.apply(this, args);
        }
    }
}
/*
    callback hell problem
        *indentation -- could be fixed with temporal dependency: continuation passing style
    Problem: asure that the callbacks are called once at the needed moment
        --> inversion of controll
        ajax(url, cb) {

            ...
            cb()//has the controll
        }
    Problem: temporal dependency of callbacks
    Callback don't have memory => articulate dependencies

    prezented problem, 3 request, some might be early than other but they are needed in a particular order
    
    Thunk = a function that has all data that it needs to do a computation, put to return the computation value you need to provide a callback
          = time independent value
          :: = promise without the API without trustability (one promise can be resolved only once)


*/