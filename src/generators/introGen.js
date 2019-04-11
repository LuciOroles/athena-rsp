let x = 1, z = 1;

function* main() {
    yield 1;
    yield 2;
    yield 3;
}


function* callForColor() {
    const replay = yield 'What\'s your color?';
    console.log(replay, ': replay inside the generator');
    if (replay !== 'black') return 'Wrong';
    return 'Get it';
}

const fetchSomething = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve('future value');
    }, 500)
})

// const asyyncFunc = gensync(function* (){
//     const result = yield fetchSomething();
//     yield result + 'S2';
// });



function* foo1() {
    x++;
    yield;
    console.log('x: ', x);

}

function* prodFoo(x, y) {
    return x * y;
}

function* prod2Foo(x) {
    var y = x * (yield ('get y'));
    return y;
}

function bar1() {
    x++;
}

function* sumFoo() {
    var x = yield 2;
    z++;
    var y = yield (x * z);
    console.log(x, y, z);
}


function step(gen) {
    var it = gen();
    var last;
    return function () {
        last = it.next(last).value;
    }
}

var dependentValGen = (function () {
    var nextVal;
    return function () {
        if (nextVal === undefined) {
            nextVal = 1;
        }
        else {
            nextVal = (3 * nextVal) + 6;
        }

        return nextVal;
    }
})();


var dependantValGenerator = (function () {

    var nextVal;

    return {

        [Symbol.iterator]: function () {
            return this;
        },
        next: function () {
            if (nextVal === undefined) {
                nextVal = 1;
            }
            else {
                nextVal = (3 * nextVal) + 6;
            }
            return {
                done: false,
                value: nextVal
            }
        }

    }

})();


function* dependantValGenGen() {
    // generator implemenatnation
    try {
        var nextVal;

        while (true) {
            if (nextVal === undefined) {
                nextVal = 1;

            }
            else {
                nextVal = (3 * nextVal) + 6;
            }

            yield nextVal;
        } //keep generating values as long as we keep asking for them

    }
    finally {
        console.log('finally block is executed when gen is stoped externally');
    }
}

module.exports = function () {

    var it = main();

    for (let o of main()) {
        console.log(o);
    } //traversing iterator


    const [...mainv] = main();

    console.log(mainv);

    const colorI = callForColor();
    const colorS1 = colorI.next().value;
    console.log(colorS1);
    const colorS2 = colorI.next('blackish').value;
    console.log(colorS2);

    var it1 = foo1();
    it1.next()
    console.log(x);
    bar1();
    it1.next();
    console.log(x);
    let prodIt = prodFoo(6, 8);
    console.log(prodIt.next().value);
    let prodIt2 = prod2Foo(6);

    let initProdIt2 = prodIt2.next(); // starts the generator
    console.log('init  prod it2=', initProdIt2.value);
    console.log(prodIt2.next(7).value);

    var itS1 = sumFoo(), itS2 = sumFoo();

    var vs1 = itS1.next().value,
        vs2 = itS2.next().value;
    console.log(`vs1 ${vs1} | vs2 ${vs2} `);
    vs1 = itS1.next(vs2 * 10);
    vs2 = itS2.next(vs1 * 5);
    itS1.next(vs2 / 2);
    itS2.next(vs1 / 4);
    itS1.next();



    for (let ix = 0; ix < 5; ix++) {
        console.log(dependentValGen());
    }

    for (let jx of dependantValGenerator) {
        console.log(jx) //automatic consumer of interator

        if (jx > 500) {
            break;
        }
    }

    let iterableArray = [1, 2, 3, 4, 5, 67, 9];

    var itA = iterableArray[Symbol.iterator]();

    console.log(itA.next(), itA.next());

    for (let hx of dependantValGenGen()) {
        console.log(hx);
        if (hx > 500) {
            console.log(' termination can be done via Return ' + dependantValGenGen().return('stop').value);
            break;
        }
    }


}