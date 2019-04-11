import Maybe from './Maybe';
import * as R from 'ramda';

var compose = R.compose,
    prop = R.prop,
    path = R.path;

var getUserBannersMonad = function ( banners, user) {
    return Maybe.of(user)
        .map(prop('accountDetails'))
        .map(prop('address'))
        .map(prop('postcode'))
        .map(prop(R.__, banners))
    }


export default getUserBannersMonad;