import importSvg from './d3tut/import.svsg';
import memoize from './functionalPolyfills/memoize';
import factorial from './functionalPolyfills/factorial';
import { foo } from './d3tut/binding.change';
import css from './d3tut/d3.css';
import hozg from './functionalPolyfills/gizmo';
import { memoizer } from './functionalPolyfills/memoize.vec';
import { identityf, addf, liftf, applyf, zcurry, twice, composeb, once, counterf, revocable } from './identity';

importSvg();
let memoizedFactorial = memoize(factorial);
let manMemFactorial = memoize(function (n) {
    console.log(`working for ${n}`);
    if (n === 1) {
        return 1;
    }
    else {
        //key difference manMemFactorial is used
        return n * manMemFactorial(n - 1);
    }
});

function meetNewDiv( string, caller /*shall be a result */ ) {
    try {
    let temp= document.createElement("div");
        temp.innerHTML= string + "#" + caller;
        document.body.append(temp);
        return true;
    }
    catch (er) {
        return er;
    }
}

let memoizedArray = [];
memoizedArray.push(manMemFactorial(3));
memoizedArray.push(manMemFactorial(3));
memoizedArray.push(manMemFactorial(5));
memoizedArray.push(manMemFactorial(7));
console.log(memoizedArray);

console.log(foo);

setTimeout(() => {
    console.log('foo after 4s:', foo);
}, 4000);

let wrapperC = [0, 1, 2, 3, 4, 5, 6, 7], wrapper = [];
wrapperC.forEach(el => { wrapper.push(document.createElement("div")) });
console.log(wrapper);
wrapper[0].innerText = JSON.stringify(hozg(), null, 3);




var factorial2 = memoizer([1, 1], function (recur, n) {
    return recur(n - 1) * n;
})

var fibonacci = memoizer([0, 1], function (recur, n) {
    return recur(n - 1) + recur(n - 2)
});

wrapper[1].innerText = " !7 === " + factorial2(7);
wrapper[2].innerText = " !9 === " + factorial2(9);
wrapper[3].innerText = " fib 3 === " + fibonacci(3);
wrapper[4].innerText = " fib 7 === " + fibonacci(7);

document.body.append(wrapper[0]);
document.body.append(wrapper[1]);
document.body.append(wrapper[2]);
document.body.append(wrapper[3]);
document.body.append(wrapper[4]);

function funky(o, o1) {
    o = null;
    o1["a"] = 2;
}

var xo = [], xy = { a: 1 };

funky(xo, xy);

console.log(xo, xy);
function add(a, b) { return a + b };
function multiply(a, b) { return a * b };

let ad2 = applyf(addf);
let lift2 = liftf(function (a, b) { return a + b });
console.log(ad2(2)(4), lift2(2)(4));

let add3 = zcurry(add, 3);
console.log(add3(30), "===33");
let inc = zcurry(add, 1);
let inc01 = addf(1);
let inc02 = liftf(add)(1);
console.log(inc(333), "333+1");
console.log(inc01(333), "333+1");
console.log(inc02(333), "333+1");

function methodize (func) {
    return function (y) {
        return func(this, y)
    }
}

Number.prototype.add = methodize(add);
console.log( (1).add(2) , "===3" );
//reverting metodize demethodize

function demethodize(func) {
    return function(that, y) {
        return func.call(that,y);
    }
}

console.log(demethodize(Number.prototype.add)(5,6) , "demethodize(Number.prototype.add)(5,6)");




meetNewDiv(" twice(add)(11) === " , twice(add)(11));
meetNewDiv(" composeb(add,multiply)(1,2,3) === " , composeb(add,multiply)(1,2,3));

let addOnce = once(add);


meetNewDiv(" first call: addOnce(2,3) === " , addOnce(2,3));
    try {
        addOnce(2,3)
    }
    catch (err) {
        console.log('this shall fail ', err)
    }


let c42 = counterf(42);

meetNewDiv(" c42.inc() === " , c42.inc());
meetNewDiv(" c42.dec() === " , c42.dec());

let revocableAddition = revocable(add);
   
    console.log(revocableAddition.invoke(3,3))
    revocableAddition.revoke();
    try {
        revocableAddition.invoke(3,1)
    } catch (err) {
        console.log('revoked f invokation needs to throw:', err);
    }
    
    


