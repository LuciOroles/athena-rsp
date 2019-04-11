
// function declarations 
// hoisted to the top of the scope

function foo(n) {
    return n;
}

//  function expresion  define anonymous function and asign it to a variable
// not hoisted
var expresion =   function (m,n) {
    return m*n;
}

//function constructor
var constructed = new Function('n', 'm', 'return n+m');

export {foo, expresion, constructed}