import * as Function from './functionalPolyfills/compose';
import ValueMappable from './functionalPolyfills/ValueMappable';

console.log('x');

var roundedSqrt = Math.round.compose(Math.sqrt);
console.log(roundedSqrt(5));


function function1(a){return a + ' 1';}
function function2(b){return b + ' 2';}
function function3(c){return c + ' 3';}
var composition = function3.compose(function2).compose(function1);
console.log( composition('count') );

var seq = function3.sequence(function2).sequence(function1);

console.log( seq('count') );

function add3 (v) {
    return v+3;
}

const myAgeData = {myAge:22, friendAge: 31};
const myDataFunctor= new ValueMappable(myAgeData);
const threeYearsLater = myDataFunctor.map(add3);

console.log(threeYearsLater.object);