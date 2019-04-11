import monad from './maybe-monad/maybeMonad';
import Maybe from './maybe-monad/Maybe';
import getUserBannerMonad from './maybe-monad/getUserBannerMonad';
import userList from './maybe-monad/userList';
import banners from './maybe-monad/banners';
import curry from 'ramda/src/curry';

Maybe.prototype.wrappActualPath = function ( ) {
        this.__value= "src/assets/" +this.__value;
        return this;
};

Maybe.prototype.ap = function (someOtherMaybe) {
    return someOtherMaybe.map(this.__value); // map is executing Maybe.of(f(this__value))
}
// var banner = document.createElement("img");
//     banner.setAttribute("src", "src/assets/"+monad())
//     // console.log(document.querySelector(".banner"));
//     document.querySelector(".banner").appendChild(banner);



 var bannerSrc =   getUserBannerMonad(banners, userList[2]).orElse(banners["default"]).wrappActualPath();
 var bannerEl = Maybe.of(document.querySelector('.banner>img'));


 /*
    fn that takes 2 maybes
 */

//  var applyBanner = function (mBanner, mEl) {
//      mEl.__value.src = mBanner.__value;

//      return mEl;
//  }

//  applyBanner(bannerSrc, bannerEl);


var applyBanner = curry(function(el, banner){
    el.src= banner;
    return el;
});
console.log(bannerEl.map(applyBanner));

//replace by Lift that, composes the 2 Maybes

var liftA2 = curry(function(fn, m1, m2){
    return m1.map(fn).ap(m2);
})

// var mutatedBanner =  bannerEl.map(applyBanner).ap(bannerSrc);

var applyBannerMaybe = liftA2(applyBanner);
var mutatedBanner2 = applyBannerMaybe(bannerEl, bannerSrc);
    
//     console.log(bannerEl, bannerSrc);