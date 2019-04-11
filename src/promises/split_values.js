function getY(x) {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve((3*x)-1)
        }, 100);
    })
}


function foo(bar, baz) {
    var x=bar*baz;

    return [
        Promise.resolve(x),
        getY(x)
    ]
}

Promise.all(foo(10,20)).then(function( [x,y] /** this is destructure */){
    // var x = msgs[0], y = msgs[1];
    console.log(`x ${x} y ${y}`);
});