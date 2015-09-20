function Promisifier(cb) {
    return function() {
        return Promise.resolve(cb.apply(cb, Array.prototype.slice.call(arguments)));
    };
}

var sumPromise = Promisifier(function(a, b) {
    return a + b;
});

var multPromise = Promisifier(function(a, b) {
    return a * b;
});

var substractPromise = Promisifier(function(a, b) {
    return a - b;
}); 

module.exports = {'sumPromise' : sumPromise, 'multPromise' : multPromise, 'substractPromise' : substractPromise}; 