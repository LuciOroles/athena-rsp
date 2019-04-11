
/**
 *@function foo
 * callback issues
 * * callback to early/late
 * * to few or too many times
 * * fail to pass along necesary env/paramenters
 * * swalloow any errors/exceptions
 */

 var p = Promise.resolve(1);

// (function foo() {
//     p.then(function(){
//         p.then(()=>{
//             console.log('C');
//         })
//         console.log('A');
//     })

//     p.then(()=>{
//         console.log('B');
//     })
// })();


function addx( x, y) {
    return x+y;
}


(function() {
    
    /**
     *
     * resolving p3 will unwrap later than  resolveing p2, so the result will printed as A,B
     * @param {*} res
     * @param {*} rej
     */
    p3= new Promise(function(res, rej){
        res("B");
        
    });
    
    var p1= new Promise(function(resolve,rej){
        resolve(p3);
    });
    
    var p2 = new Promise(function(res, rej){
        res("A");
    })
    p1.then(function(v){
        console.log(v)
    })
    p2.then(function(v){
        console.log(v)
    })
})();

(function(){
    var p1 = Promise.resolve(22);

    p1.then(function fullfilled(msg){
        foo(); // this shall fail
        console.log('msg recived ', msg);
    },
    function reject() {
        console.log('got rejected');
    }
    ).catch((err)=>{
        console.log(err.message, ' err is handled')
    });
})();

let promisifyAddx = Promise.resolve(addx(2,4));

    promisifyAddx.then((v)=>{
        console.log('2+4=',v);
    });

    (function(){
        function foo(cb) {
        setTimeout(function(){
            try {
             let x = az.nar(); // not existing, throw errr
            cb(null, x);
            }
            catch (err) {
                cb(err)
            }
        }, 100)
        }
        foo(function(err, val) {
                if (err) {
                    console.log(`something when wrong ${err}`)
                }
                else  if (val) {
                    console.log(`worked, val = ${val}`)
                }
        })

    })()