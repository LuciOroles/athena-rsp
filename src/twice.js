function twice(binary) {
    return function(a) {
        return binary(a,a);
    }
}

export default twice;