
console.log( (function(){console.log(this.length)}).call([1,2,3])); //this == the array; this.length ===3
console.log(Math.max.apply(null,[1,2,4]));

function bindSecondArg(func, b) {
    return function (a) {
        return func(a, b);
    }
}

var cubeOf = bindSecondArg(Math.pow, 3);
    console.log(cubeOf(4), "=64?")

Function.prototype.partialApply = function() {
    var func= this;
    args = Array.prototype.slice.call(arguments);
    return function() {
        return func.apply(this,args.concat(Array.prototype.slice.call(arguments)))
    }
}

function nums2hex() {
    function componentToHex(component) {
        var hex= component.toString(16);
        if (hex.length ===1)       {
            return "0"+ hex;
        }
        else {
            return hex;
        }
    }

    return Array.prototype.map.call(arguments, componentToHex).join('');
    
}

console.log(nums2hex(100,200));

var myOUI=123;
    var getMacAddress = nums2hex.partialApply(myOUI);
    console.log(getMacAddress());
    console.log(getMacAddress(1));
    console.log(getMacAddress(100, 200, 2, 123, 66, 0, 1));

Function.prototype.partialApplyRight = function () {
    var func = this;
    args = Array.prototype.slice(arguments);
    return function() {
        return func.apply(this, [].slice.call(arguments,0).concat(args));
    }
}
var shadesOfBlue = nums2hex.partialApplyRight(255);
    console.log(shadesOfBlue(123,0));
    console.log(shadesOfBlue(100,200));

Function.prototype.curry = function (numArgs) {
    var func = this;
    let counter=0;
    numArgs = numArgs || func.length;
    //recursively acquire the arguments
    // console.log('number of args: ', numArgs);
    function subCurry(prev) {
        counter++;
        console.log( `${prev} = prev; ${counter} = counter` );
        return function(arg) {
            var args = prev.concat(arg);
            if (args.length< numArgs) {
                return subCurry(args);
            }
            else {
                return func.apply(this, args);
            }
        }
    };
    return subCurry([]);
}


function rgb2hex(r,g,b) {
    return "#"+nums2hex(r) + nums2hex(g) + nums2hex(b);
}

var hexColors = rgb2hex.curry();

console.log(hexColors(11)(12)(233));