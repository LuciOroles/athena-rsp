import { addf } from './identity'
import { Monad, MonadB } from './functionalPolyfills/monad'
import { memoizer } from './functionalPolyfills/memoize.vec';
import { isPrime } from './fact.prime';
import { memoizePrime } from './memoizePrime';
import { getPrimeDivisor } from './getPrimeDivisor';
import randomMapGenerator from './randomIntMapGenerator';
import { createCanvas } from './canvasManipulator';
import primes_css from './primes.css';

console.log('i2', addf(2)(200));

let unit = Monad();
let monad = unit(2);
function squared(e) { return e * e; }

let square = monad.bind(squared);
// let fibonacci = memoizervec([1, 1], function (recur, n) {
//     return recur(n - 1) + recur(n - 2)
// });

console.log(memoizer);


console.log('327 is prime', isPrime(327));

function retPrimeArray(n) {
    return function (primeArray = []) {
        var bottom_margin = 1, memo = primeArray.slice(0);
        if (Array.isArray(primeArray)) {
            if (primeArray.length > 0) {
                bottom_margin = primeArray[0] + 1;
                primeArray = [];
            }
        }

        var recur = function (n) {

            if (isPrime(n)) {
                primeArray.push(n);
                // console.log(`found ${n} ${primeArray} ${bottom_margin}`)
                //bottom_margin!==1 ? primeArray.unshift(n) :
            }
            if (n === bottom_margin) {
                // console.log(`found ${n} ${primeArray}`)
                console.log(`meme is ${memo}`);
                return primeArray.concat(memo);
            }
            else {
                return recur(n - 1);
            }
        }

        return recur(n);
    }
}

let primesOf9 = retPrimeArray(9)();
console.log(primesOf9);
let primesOf21 = retPrimeArray(21)(primesOf9);
let primesOf60 = retPrimeArray(60)(primesOf21);
//let primesOf21 = retPrimeArray(21); //recursive version... now memoize it  
console.log(primesOf21);
console.log(primesOf60);
// let MemoizedPrime = memoizePrime();
// let Memoized9 = MemoizedPrime(9);

//     console.log(Memoized9);
// let Memoized19 = MemoizedPrime(19);
//     console.log(Memoized19);

// let memoize28 = MemoizedPrime(28);
//     console.log(memoize28);
// let memoize58 = MemoizedPrime(58);
//     console.log(memoize58);

let primeDivisorInstance = getPrimeDivisor();
// console.log(primeDivisorInstance(1));


// let MemoizedPrime = memoizePrime();
// console.log(MemoizedPrime(1));

let myCanvas = createCanvas();
    document.body.appendChild(myCanvas);
let context = myCanvas.getContext('2d');   

let primes = randomMapGenerator(5, 600);
primes.forEach((val, key, map) => {
    map.set(key, primeDivisorInstance(key).filter((prime) => {
        if (key % prime == 0) {
            return true
        }
        return false;
    }));
});

context.font = "13px Arial";
let idx=1;
let heMax = 600;
primes.forEach((val, key, mapx) => {

    // let divisorsOnly = mapx.get(key).filter((prime) => {
    //     if (key % prime == 0) {
    //         return true
    //     }
    //     return false;
    // });
    let he = val.reduce((pv, acc)=>{ return acc=acc+pv;});
    let starting= idx*40;




    context.beginPath();
    context.rect( starting  , heMax-he , 15 , he  );
    context.fillStyle = 'yellow';
    context.fill();

    context.save();
    context.translate(starting+12  , heMax-(he+10) );
    context.rotate(-Math.PI/2);
    // context.textAlign = "center";
    context.fillStyle = 'blue';
    context.fillText(he,0,0);
    context.restore();

    context.save();
    
    context.translate(starting+20+12  , heMax-(key+10) );
    context.rotate(-Math.PI/2);
    // context.textAlign = "center";
    context.fillStyle = 'red';
    context.fillText(key,0,0);
    context.restore();

    context.beginPath();
    context.rect( starting+20  , heMax-key , 15 , key  );
    context.fillStyle = 'black';
    context.fill();



    

    idx++;



   console.log(`${key} has divisors ${val} `);

})
    //  idx=1;
    // primes.forEach((val,key, mapx)=>{
    // let starting= idx*40;
    // context.beginPath();
    // context.rect( starting+20  , 600-key , 15 , key  );
    // context.fillStyle = 'black';
    // context.fill();
    // idx++;
    // })










// let primeDivisors =     setOfNumber.map((nr)=> {
//         console.log(nr, primeDivisorInstance(nr));
//         return [nr]
//     });

// let primeNumbersThatCouldDivide140 =  primeDivisorInstance(140);
//console.log(primeNumbersThatCouldDivide140);

// let sumOfPrimeDiv=primeNumbersThatCouldDivide140.filter((v)=>{
//        if (140%v === 0) {
//         return true;
//        }  
//        return false;
//     }).reduce((prv, current)=>{
//         console.log(current, prv);
//         return current=current+prv;
//     })

//     console.log(`sum of prime div: ${sumOfPrimeDiv} `)

// let primeNumbersThatCouldDivide210 = primeDivisorInstance(210);
//console.log(primeNumbersThatCouldDivide210);
// let memoizePrime = function memoizePrime(memo, formula) {
//     var recur = function (n) {
//         var result = memo[n];
//         if (!Array.isArray(result)) {
//             result= formula(recur, n);
//             memo[n]= result;
//         }
//         return result;
//     }
//     return recur;
// }
// let iterativeMemo9 = memoizePrime([ [1], [1,2] ], function ( retPrimeArray, n ) {
//     return retPrimeArray(1).push(retPrimeArray(2));
// }) ;
// iterativeMemo9(3);

// let k = memoizer([1, 1], function (recursive, n) {
//     return recursive(n - 1) + recursive(n - 2);
// });

// console.log(k(5));






// let memoizePrimeArray = memoizer([1], function( ))

// console.log(square, 'square' );
// monad.bind(console.log);
// monad.bind(alert);

let ajaxS = MonadB().lift('squared', squared);
let ajaxI = ajaxS(5);
// console.log(ajaxI.squared);