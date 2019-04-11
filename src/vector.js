function vectorBug (){
    var array=[];

    return {
        get: function get(i) {
            return array[i];
        },
        store: function store(i, v) {
            array[i]=v;
        },
        append: function append(v) {
            array.push(v);
        }
    }
}

function vector (){
    var array=[];

    return {
        get: function get(i) {
            return array[+i]; // type coortion
        },
        store: function store(i, v) {
            array[+i]=v; //type cortion to int
        },
        append: function append(v) {
            array[array.length] =v;
        }
    }
}

// Array.prototype.push = function (myV) {
//     console.log(myV);
// }

let myVector = vector();
    myVector.append('test');
    myVector.append('re-test');
    myVector.append('river-test');


    let myHeck = null;
    myVector.store('push',function () {
        myHeck = this; //this based on the context
        //they are no arrays in this lang 
    });

    myVector.append('any-value');
    

    console.log(myVector.get(0), console.log(myHeck)  );