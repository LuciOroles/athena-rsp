import { throws } from "assert";

var small = {
    getPrice: function() {
        return this.basePrice+6;
    },
    getDimensions: function() {
        return [44,63];
    }
};

var large = {
    getPrice: function() {
        return this.basePrice+10;
    },
    getDimensions: function() {
        return [64,83];
    }
}

var Shirt = function (size) {
    this.size = size;
    this.basePrice=1;
    this.getPrice= function() {}; //empty for now as mixins are added
    this.getDimensions= function() {}; //empty for now as mixins are added
}

Shirt.prototype.addMixin= function(mixin) {
    for (var prop in mixin) {
        if (mixin.hasOwnProperty(prop)) {
            this.prototype[prop]= mixin[prop];
        }
    }
}

var TShirt = function (size) {
    this.size = size;
    this.basePrice=5;
    this.getPrice= function() {}; //empty for now as mixins are added
    this.getDimensions= function() {}; //empty for now as mixins are added
}




TShirt.prototype = Object.create(Shirt.prototype);
TShirt.prototype.constructor = TShirt;
// TShirt.prototype.getPrice = function () {
//     if (this.size === 'small') {

//         return 5;
//     }
//     else {
//         return 10;
//     }
// }

var ExpensiveShirt = function (size) {
    this.size = size;
}

ExpensiveShirt.prototype = Object.create(Shirt.prototype);
ExpensiveShirt.prototype.constructor = ExpensiveShirt;
ExpensiveShirt.prototype.getPrice = function () {
    if (this.size === 'small') {
        return 20;
    }
    else {
        return 30;
    }
};

var Store = function (products) {
    this.products = products;
    this.customer= new Customer();
}

Store.prototype.calculateTotal = function (TAX) {
    return this.products.reduce(function (sum, product) {
        return sum + product.getPrice();
    }, 10) * TAX;
}
Store.prototype.setCustomer= function(customer) {
    this.customer = customer;
}
Store.prototype.getTotal = function() {
    // console.log(this.customer);
    return this.customer.calculateTotal(this.products);
}

var Customer = function () { };
Customer.prototype.calculateTotal = function (products) {
    return this.products.reduce(function (sum, product) {
        return sum + product.getPrice();
    }, 10) * TAX;
};

var RepeatCustomer = function () { };
RepeatCustomer.prototype = Object.create(Customer.prototype);
RepeatCustomer.prototype.constructor = RepeatCustomer;
RepeatCustomer.prototype.calculateTotal = function (products) {
    return products.reduce(function (total, product) {
        return total + product.getPrice();
    }, 5) * TAX;
};



var TaxExemptCustomer = function(){};
TaxExemptCustomer.prototype = Object.create(Customer.prototype);
TaxExemptCustomer.prototype.constructor = TaxExemptCustomer;
TaxExemptCustomer.prototype.calculateTotal = function(products) {
return products.reduce(function(total, product) {
return total + product.getPrice();
}, 10);
};

export default function () {
    
     console.log(TShirt);

    Object.keys(new TShirt()).forEach(console.log)

    var p1 = new TShirt(),  p2 = new ExpensiveShirt('large'), s = new Store([p1, p2]), TAX=1.08, c = new TaxExemptCustomer();
    s.setCustomer(c);


    return s.getTotal();
}