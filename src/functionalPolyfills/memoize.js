export default function (func) {
    var cache= {};
    return function() {
        var key = JSON.stringify(arguments);
        if (cache[key]) {
            //  console.log(' returned cached ', key, cache[key]);
            return cache[key];
        }
        else {
            var val = func.apply(this, arguments);
            cache[key] = val;
            return val;
        }
    };
}