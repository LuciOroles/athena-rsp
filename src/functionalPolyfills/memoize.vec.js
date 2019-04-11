 function memoizer(memo, formula /*a  recurcisve function*/ ) {
    var recur = function(n) {
            var result = memo[n];
            if (typeof result!== 'number') {
                result = formula(recur, n);
                memo[n] = result;
            }
            return result;
    }
    return recur;
}


export {memoizer}