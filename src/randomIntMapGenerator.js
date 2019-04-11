export default function (items, upperMargin) {
    
    let a_r = [];
    do {
        let v = Math.floor(Math.random()*upperMargin);
        if (a_r.indexOf(v) === -1) {
            a_r.push(v)
        }
    } while ( a_r.length < items );

    a_r.sort(function(a, b){ return a-b; });
    let result = new Map();

    a_r.forEach((v)=>{
        result.set(v, []);
    });

    return result;
}