  var Y = function (F) {
    return (function (f) {
        return f(f);
    }(function (f) {
        return F(function (x) {
            return f(f)(x)
        })
    }));
}

export default Y;