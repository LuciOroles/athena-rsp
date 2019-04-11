let isPrime = function isPrime(nr, divisor=2) {
    if (nr<=2) {
        return (nr==2) ? true : false;
    }
    if ( nr % divisor=== 0 ) return false;
    if (divisor*divisor> nr) return true;
    return isPrime(nr, divisor+1);
}

export {isPrime};