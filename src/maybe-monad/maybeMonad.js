var banners =
{
    "a": "greyjoy-banner-flag-3.jpg",
    "b": "nights-watch-banner-flag-3.jpg",
    "c": "targaryen-banner-flag-3.jpg",
    "default": "default-banner.jpg"
};
import * as R from 'ramda';

var compose = R.compose,
    prop = R.prop,
    path = R.path;

var getUserBanners = compose(
    prop(R.__, banners),
    path(['accountDetails', 'address', 'postcode'])
);


var Maybe = function (val) {
    this.__value = val;
};
Maybe.of = function (val) {
    return new Maybe(val);
}

Maybe.prototype.isNothing = function () {
    return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function (f) {
    if (this.isNothing()) {
        return Maybe.of(null);
    }
    return Maybe.of(f(this.__value));
}

Maybe.prototype.join = function () {
    return this.__value;
}

Maybe.prototype.chain = function () {
    return this.map(f).join(); // return simpler 'string' value or null
}

Maybe.prototype.orElse = function(default_) {
    if (this.isNothing()) {
        return Maybe.of(default_);
    }
    return this;
}


console.log(prop(R.__, banners)("a"));


let M119 = Maybe.of(119);
console.log(M119.__value);

var getUserBannersMonad = function ( banners, user) {
    return Maybe.of(user)
        .map(prop('accountDetails'))
        .map(prop('address'))
        .map(prop('postcode'))
        .map(prop(R.__, banners))
    }




export default function monad() {

    var user = {
        email: 'james@example.com',
        accountDetails: {
            address: {
                street: '123 Fake St',
                city: 'Exampleville',
                province: 'NS',
                postcode: 'b'
            }
        },
        preferences: {}
    };
    var user2 = {
        email: 'james@example.com',
        accountDetails: {}
    };

    console.log(path(['accountDetails', 'address', 'postcode'])(user))

    console.log(getUserBanners(user), getUserBanners({}), getUserBanners(user2));
    console.log('getUserBannersMonad(user)  way ' , getUserBannersMonad(banners,  user).join() );
    console.log('getUserBannersMonad(user2) way ' , getUserBannersMonad(banners, user2).orElse(banners["default"]).join());


    console.log(R.identity(2));


    return banners[user.accountDetails.address.postcode];
}