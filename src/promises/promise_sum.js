function fetchX(cb) {
    setTimeout(function(){
        cb(Math.floor(Math.random()*10));
    }, 200);
}


  var numberCreator = function () {
      return  new Promise((res, rej)=>{
        setTimeout(()=>{
          res(Math.floor(Math.random()*10))
        }, 100)
    });
  }
  
  var numberConsumer = function (promise) {
      return promise.then((v)=>{
        return v;
      }).catch((err)=>{
        console.log('error branch', err )
      })
  }

  let k = new Promise((res, rej)=>{
      setTimeout(()=>{
        res(Math.floor(Math.random()*10))
      }, 100)
  });

//   k.then((r)=>{
//       console.log(`promise resolved with ${r}`)
//   })


  function add(xPromise, yPromise) {
     return Promise.all([xPromise,yPromise])
        .then(function(values){
            return values[0] + values[1];
        });
  }

   add( k, k ).then(function(sum) {
        console.log(sum);
   })


let  prom1 = numberCreator();

let consumer1 = numberConsumer(prom1);
let consumer2 = numberConsumer(prom1);
console.log(consumer1 instanceof Promise, consumer2);



