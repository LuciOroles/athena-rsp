import Y from './functionalPolyfills/ycombinator';
import {foo, expresion, constructed} from './functionalPolyfills/declarations.expresions';
import store from './functionalPolyfills/functional.inhertance';

var FactorialGen = function(factorial) {
    return (function(n){
        if (n==0) {
            return 1;
        }
        else {
            return n*factorial(n-1);
        }
    })
}

var Factorial = Y(FactorialGen);

//Fixed points come from math, where a fixed point of a function f is a value for which f(x) = x. For example, the squareRoot function has two fixed points, 0 and 1, because squareRoot(0) = 0 and squareRoot(1) = 1

console.log(Factorial(10), foo(1), expresion(2,3), constructed(2,3), store());

