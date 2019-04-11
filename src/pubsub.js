/**
 * @var subscriber is a array of function, they execute with a value, publication
 *
 * fallacy 1: 
 *  if the subscriber is undefined, or mailcious fn
 * fallacy 2 
 *  setting the instance of publish = undefined
 *  my_pubSub.publish = undefined;
 * fallacy 3
 *  access to 'this' via the subscribe function, this === subscribers, resulting in any malticious access to the list
 *  fixes:
 *      using .call()  for  subscribers[i](publication);
 *      asign var k =subscribers[i];  k.(publication); 
 *      use forEach  instead of iterative for
 * 
 * @returns
 */
function pubsub() {
    var subscribers = [];
    return Object.freeze({
        subscribe: function (subscriber) {
            subscribers.push(subscriber)
        },
        publish: function (publication) {
            subscribers.forEach(function (s) {
                try {
                    s(publication);
                } catch (ignore) {
                    console.log('catching if the function is null, undefined etc', ignore)
                }
            })
        }
    })
}


