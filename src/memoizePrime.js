import { isPrime } from './fact.prime';
const memoizePrime = function memoizePrime() {
    var primeResults = [];

    return function (n) {
        // console.log(primeResults, "primeResults of ", n);
        var primeArray = [];
        var recur = function (n) {
            if (primeResults[n]) {
                return primeArray.concat(primeResults[n]);
            }
            if (isPrime(n)) {
                // console.log(`${n} is prime executed`);
                primeArray.push(n);
            }
            if (n === 1) {
                //bottom_margin
                primeArray.push(1);
                return primeArray;
            }
            else {
                return recur(n - 1);
            }
        }
        primeResults[n] = recur(n);
        return primeResults[n];
    }
}

export { memoizePrime }