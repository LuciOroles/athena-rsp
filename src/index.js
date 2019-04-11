
import fadeCss from './fade.css';
import fade from './fade';
import { identityf, addf, liftf } from './identity';
import { add, mul, sub } from './calc';
import { curry, curryE6 } from './curry';
import twice from './twice';
import {addg, liftg, arrayg} from './addg';
import { continuize, continuize6 } from './continuize';

fade("idFade");
setTimeout(function () {
    fade("idFade2");

}, 2000)

function reverse(binary) {
    return function (first, secound) {
        return binary(secound, first);
    }
}

function square(a) {
    return mul(a, a);
}
function doubl(a) {
    return add(a, a);
}

function composeu(fn1, fn2) {
    return function (a) {
        return fn2(fn1(a));
    }
}

function composeb(f, g) {
    return function (a, b, c) {
        return g(f(a, b), c);
    }
}

function limit(binary, count) {
    return function (a, b) {
        if (count >= 1) {
            count -= 1;
            return binary(a, b);
        }
        return undefined;
    }
}//function that is called for a nr of times

function fromS(start) {
    return function () {
        var next = start;
        start += 1;
        return next;
    }
}


function to(generator, a) {
    return function () {
        let v = generator()
        if (v < a) {
            return v;
        }
        return undefined;
    }
}

function fromTo(init, end) {
    return to(fromS(init), end);
}


function element(array, gen) {
    if (gen === undefined) {
        gen = function () {
            return fromTo(0, array.length);
        }
    }
    return function () {
        var index = gen();
        if (index !== undefined) {
            return array[index];
        }
    }
}



function collect(gen, array) {
    return function () {
        var value = gen();
        if (value !== undefined) {
            array.push(value);
        }
        return value;
    }
}

function filter(gen, predicate) {
    return function () {
        var value;
        do {
            console.log(typeof gen);
            value = gen();
        }
        while (value !== undefined && !predicate(value));
        return value;
    }
}

function concat(gen1, gen2) {
    var gen = gen1;
    return function() {
        var value = gen();
        if (value!==undefined) {
            return value;
        }
        gen = gen2;
        return gen();
    }
}

function gensymf(prefix) {
    var number=0;
    return function() {
        number+=1;
        return prefix+ number;
    }
}

function gensymf2(prefix) {
    var number=fromS(1);
    return function() {
        return prefix+ number();
    }
}

function fibonaccif(a,b) {
    var i=0;

    return function() {
        var next;
        switch(i) {
            case 0:
                i=1;
                return a;
            case 1:
                i=2;
                return b;
            default:
                next=a+b;
                a=b;
                b=next;
                return next;
            
        }
    }
}

function fibonacif2 (a,b) {
    return function() {
        var next = a;
        a= b;
        b+=next;
        return next;
    }
}

let from3 = fromS(3);

// let from3to10 = to(from3,10);
// while (from3to10) {
//     from3to10 = to(from3,10);
//     console.log(from3to10);
// };

function counter(value) {
    return {
        up() {
            value+=1;
            return value;
        },
        down() {
            value-=1;
            return value;
        }
    }
 }

 function revocable(binary) {
     return {
         invoke: function(first, second) {
             if (binary!==undefined) {
                 return binary(first, second)
             }
         },
         revoke: function() {
             binary = undefined;
         }
     }
 }

 function m(value, source) {
     return {
         value: value,
         source: (typeof source==='string') ? source : String(value)
     }
 }
function addm(a,b) {
    return m(a.value+ b.value, "("+a.source+ "+"+ b.source+ ")");
}

function convertToM (a) {
    if (typeof a === 'number') {
        a = m(a)
    }
    return a;

}

function liftm (binary, op) {
    return function(a,b) {
        a = convertToM(a);
        b = convertToM(b);

        return m(
            binary(a.value, b.value),
            "("+a.source+ op + b.source+ ")"
            )
    }
}

function exp(value) {
    return (Array.isArray(value))? value[0]( exp(value[1]), exp(value[2])):  value;
}

let incV1 = addf(1), incV2 = liftf(add)(1), incV3 = curry(add, 1);
// console.log(`${incV1(30)}, ${incV2(30)}, ${incV3(30)} ${twice(add)(31)}  ${reverse(sub)(3,2)} `);
// console.log(composeu(doubl,square)(5) );
// console.log(composeb(add, mul)(2,3,7));
// console.log(limit(add,2)(2,3));

// console.log(from3(), from3(), from3());
// console.log(fromTo(3, 7), "fromTo(3, 7)"  );
// let from1 = fromS(1);
// console.log(element(['a', 'ax', 'ay', 'az' ], from1)() )
// let elm=element(['a', 'ax', 'ay', 'az' ]);
// let collected=[];
// let collecting = collect(from3, collected);
// collecting();
// collecting();
// collecting();
// console.log(elm(), elm(), elm());
// console.log(collected)
let filtering3 = filter(fromTo(0, 5), function third(v) {
    return (v % 3) === 0;
});
let concat0203 = concat(fromTo(0,2), fromTo(0,3));

var kl;
do {
    kl=concat0203();
    console.log(kl);
} while (kl!==undefined);

let gensymfH = gensymf("H");
let gensymfG = gensymf2("G");

console.log(gensymfH(), gensymfH());
console.log(gensymfG(), gensymfG(), gensymfG() );

let fibonacciGen = fibonaccif(0,1);
let fibonaciiGen2 = fibonacif2(0,1);
let fib_array = [], fib_array2=[];
for (let i = 0; i<10; i++) {
    fib_array.push(fibonacciGen())
    fib_array2.push(fibonaciiGen2())
}
// console.log(fib_array.join("#"), fib_array2.join("#"));

let counterInstance = counter(10);
    // console.log(counterInstance.up());
    // console.log(counterInstance.down());
let revocableAdd = revocable(add);
    // console.log(revocableAdd.invoke(1,2));
    // revocableAdd.revoke();
    // console.log(revocableAdd.invoke(1,2));

let unu = m("1");
    console.log(JSON.stringify(unu));

    console.log(addm(m(3),m(4)))

    console.log(liftm(add,"plus" )(m(3),m(4)));
    console.log(liftm(add,"plus" )(3,m(4)));
var sae = [mul,5,11];
    console.log(exp(sae));
var nae = [ Math.sqrt, [add,[square,3], [square,4] ] ]
 console.log(exp(nae));

let addg1 = addg(2)(3)(4)(5)();
    console.log(addg1);
 let addg2 =   addg(12)(13)();
    console.log(addg2, liftg(mul)(1)(2)(3)(4)(5)() );
    

// console.log('Javascript the Good Parts', add(1,1), identityf(3)() );

let array_geneartor = arrayg(3)(4)(9)(0)(null)();
    console.log(array_geneartor);
let sqrtc = continuize(Math.sqrt);
    sqrtc(console.log, 81);