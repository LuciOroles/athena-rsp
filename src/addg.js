/**
 * 
 * @param {*} first 
 * this function is invoking itslef until it finds no more parameters
 * addg(1)(2)(3)() => 1+2+3
 */
function addg(first) {  
    function more(next) {
        if (next===undefined){
            return first;
        }
        first+=next;
        return more;
    }

    if (first!==undefined) {
        return more;
    }
}

function liftg(binary) {  
    return function (first) {
        if(first===undefined) {
            return first;
        }

        return function more(next) {
            if (next === undefined ) {
                return first;
            }
            first = binary(first,next);
            return more;
        }
    }
}

function arrayg(first) {
    let result=[];
     function more(next)  {
        if (next === undefined) {
            return result;
        }
        result.push(next);
        return more;
    }
    return more(first);
}


export {addg, liftg, arrayg};
 