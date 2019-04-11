function curry (binary, first) {
    return function (second) {
        return binary(first, second);
    }
} 

function curryE6(func, ...first) {
    return function(...second) {
        return func(...first, ...second);
    }
}


export {curry, curryE6 };