import { memoizePrime } from './memoizePrime';

function getPrimeDivisor () {
    let memoizePrimeInstance = memoizePrime();
    var accumulator = [];
     return function (n) {
           
           var index=1;
           var maxPosibleDivisor = Math.floor(n/2);
           var recuring = function (v) {
                // if (Array.isArray(accumulator[v])) {
                //     accumulator
                // } 
                if (v === maxPosibleDivisor ) {
                    // console.log(accumulator, 'accumulator important' );
                    return  accumulator[v] || memoizePrimeInstance(v); // added for case of 1,2
                }
                else {
                    v++;
                    accumulator[v]=memoizePrimeInstance(v);
                    return recuring(v);
                }
           } 
           return recuring(index);
     }   
}

export {getPrimeDivisor}