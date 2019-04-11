let streamNumbers = function *streamNumbers() {
    for (let i=0; i<11; i++) {
        let a = yield (i*10);
        if ( a ==='stop' ) {
            break;
        }
    }
    return 'end';
}

export default streamNumbers;