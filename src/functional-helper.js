/**
 * @ngdoc overview
 * @name byng.module.functional-helpers.functional-helpers
 * @description
 * Collection of functions to use in functional programming chains
 */
angular.module(
    "byng.module.functional-helpers.service.functional-helpers",
    [ ]
)
    .factory("isTruthy", function() {
        /**
         * @ngdoc service
         * @name byng.module.functional-helpers.functional-helpers.isTruthy
         * @description
         * Returns true if the given value is truthy
         *
         * Useful for eg:
         *
         *     var options = { ... };
         *     var activeOptions = Object.keys(options)
         *         .map(pluckFrom(options))
         *         .filter(isTruthy())
         *
         * Use {@link byng.module.functional-helpers.functional-helpers.not not} for isFalsy, eg:
         *
         *     .filter(not(isTruthy()))
         *
         * @returns {Function} which returns Boolean when called
         */
        return function(modifier) {
            modifier = modifier || function(value) { return value; };
            return function isTruthy(value) {
                return !! modifier(value);
            };
        };
    })
    .factory("isDefined", function() {
        /**
         * @ngdoc service
         * @name byng.module.functional-helpers.functional-helpers.isDefined
         * @description
         * Returns true if the given value is not undefined
         *
         * Useful for eg:
         *
         *     var form = { ... };
         *     var missingKeys = Object.keys(form)
         *         .filter(not(isDefined(pluckFrom(form)));
         *     alert("Please fill in these missing keys: " + missingKeys.join(", "));
         *
         * @returns {Function} which returns Boolean when called
         */
        return function isDefined(modifier) {
            modifier = modifier || function(value) { return value; };
            return function (value) {
                return modifier(value) !== undefined;
            };
        };
    })
    .factory("containedIn", function() {
        /**
         * @ngdoc service
         * @name byng.module.functional-helpers.functional-helpers.containedIn
         * @description
         * Accepts an array, then returns true if values passed are contained within the array.
         *
         * Useful for eg:
         *
         *     var blockedItems = [ ... ];
         *     var items = [ ... ];
         *     var allowedItems = items.filter(not(containedIn(blockedItems)));
         *
         * @param {string|array} haystack to search in
         * @returns {Function} which returns Boolean when called with a needle
         */
        return function contains(haystack) {
            return function(needle) {
                return haystack.indexOf(needle) > -1;
            };
        };
    })
    .factory("contains", function() {
        /**
         * @ngdoc service
         * @name byng.module.functional-helpers.functional-helpers.contains
         * @description
         * Accepts a value, then returns true if arrays passed contain the value.
         *
         * Useful for eg:
         *
         *     var strings = [ ... ];
         *     var fooStrings = strings.filter(conatins("foo"));
         *
         * @param {*} needle to search for
         * @returns {Function} which returns Boolean when called with a haystack
         */
        return function contains(needle) {
            return function(haystack) {
                return haystack.indexOf(needle) > -1;
            };
        };
    })
    .factory("startsWith", function() {
        /**
         * @ngdoc service
         * @name byng.module.functional-helpers.functional-helpers.startsWith
         * @description
         * Accepts a needle, then returns true if haystacks passed start with the needle.
         * Works with both arrays and strings.
         *
         * Useful for eg:
         *
         *     var something = { ... };
         *     var getters = Object.keys(something)
         *         .filter(startsWith("get"));
         *
         * @param {string|array} needle to search for
         * @returns {Function} which returns a Boolean when called with a haystack
         */
        return function startsWith(needle) {
            return function(haystack) {
                return haystack.indexOf(needle) === 0;
            };
        };
    })
    .factory("not", function() {
        /**
         * @ngdoc service
         * @name byng.module.functional-helpers.functional-helpers.not
         * @description
         * Accepts a function, then returns the inverse boolean of the function's return value.
         *
         * Useful for eg:
         *
         *     var notFoo = not(contains("foo"));
         *     return notFoo("foobar");
         *
         * @param {Function} func to call
         * @returns {Function} which returns Boolean when called with arguments
         */
        return function not(func) {
            return function(/* arguments */) {
                return ! func.apply(undefined, arguments);
            };
        };
    })
    .factory("pluckFrom", function() {
        /**
         * @ngdoc service
         * @name byng.module.functional-helpers.functional-helpers.pluckFrom
         * @description
         * Accepts an object, then returns properties from it as it is called with keys.
         *
         * Useful for eg:
         *
         *     var details = { ... };
         *     var definedKeys = Object.keys(details)
         *         .filter(isDefined(pluckFrom(details)));
         *
         * @param {Object} obj to pluck from
         * @returns {Function} which returns * when called with keys.
         */
        return function pluckFrom(obj) {
            return function(key) {
                return obj[key];
            };
        };
    })
    .factory("unique", function() {
        /**
         * @ngdoc service
         * @name byng.esrvice.functional-helpers.unique
         * @description
         * Intended to be passed into Array.filter - ensures the array does not contain
         * any duplicates.
         *
         * Useful for eg:
         *
         *     var numbers = [ 1, 2, 2, 3 ];
         *     numbers = numbers.filter(unique);
         *     // [ 1, 2, 3 ]
         *
         * @param {*} value to check is unique
         * @param {int} index of current value in array
         * @param {array} arr to check against
         * @returns {Boolean} true if this is the first instance of the value in the array
         */
        return function unique(value, index, arr) {
            return arr.indexOf(value) === index;
        };
    })
    .factory("pluck", function() {
        /**
         * @ngdoc service
         * @name byng.module.functional-helpers.functional-helpers.pluck
         * @description
         * Accepts a key string, then returns properties from given objects corresponding to the
         * key.
         *
         * Useful for eg:
         *
         *     var allAddresses = allCustomers
         *         .map(pluck("address"));
         *
         * @param {string} property to pluck
         * @returns {Function} which returns * when called with objects.
         */
        return function pluck(property) {
            return function(obj) {
                return obj[property];
            };
        };
    })
    .factory("callWith", function() {
        /**
         * @ngdoc service
         * @name byng.module.functional-helpers.functional-helpers.callWith
         * @description
         * Accepts arguments to be passed to subsequent functions
         *
         * Useful for eg:
         *
         *     var listener = [ ... ];
         *     var customer = ...;
         *     listener
         *         .forEach(callWith(["login", customer], $scope));
         *
         * @returns {Function} which returns * when called with functions
         */
        return function callWith(args, context) {
            return function(func) {
                return func.apply(undefined, args);
            };
        };
    })
    .factory("callMethod", function() {
        /**
         * @ngdoc service
         * @name byng.module.functional-helpers.functional-helpers.callMethod
         * @description
         * Accepts a method name and arguments, then calls the named method on given objects.
         *
         * Useful for eg:
         *
         *     var children = [ ... ];
         *     var everyoneSayHello = callMethod("say", "Hello");
         *     everyoneSayHello(children);
         *     // Alex says: Hello
         *     // Billie says: Hello
         *     // Chris says: Hello
         *
         * @param {string} method to call
         * @param {*[]} args to pass to the method
         * @returns {Function} which returns * when called with objects
         */
        return function callMethod(method, args) {
            return function(obj) {
                return obj[method].bind(obj, args)();
            };
        };
    })
    .factory("allOf", function() {
        /**
         * @ngdoc service
         * @name byng.module.functional-helpers.functional-helpers.allOf
         * @description
         * Returns true if all given functions return true
         *
         * Useful for eg:
         *
         *     var fooNotBar = allOf(startsWith("foo"), not(contains("bar")));
         *     return fooNotBar("foobar");
         *
         * @returns {Function} which returns Boolean when called
         */
        return function allOf(method, args) {
            var callbacks = [].slice.call(arguments);
            return function() {
                var input = [].slice.call(arguments);
                return callbacks
                    .every(function(callback) {
                        return callback.apply(undefined, input);
                    });
            };
        };
    })
    .factory("ucfirst", function() {
        /**
         * @ngdoc function
         * @name byng.module.functional-helpers.functional-helpers.ucfirst
         * @description
         * Returns an input string with the first letter capitalised.
         *
         * @return {Function}
         */
        return function(modifier) {
            modifier = modifier || function(value) { return value; };
            return function ucfirst(input) {
                input = modifier(input);
                return input.charAt(0).toUpperCase() + input.slice(1);
            };
        };
    })
    .factory("squirt", function() {
        /**
         * @ngdoc function
         * @name byng.module.functional-helpers.functional-helpers.squirt
         * @description
         * Returns the given values when called
         *
         * useful for:
         *
         *     $q.when(... some async request here...)
         *         .catch(...)
         *         .then(squirt(["alex", "bo", "chris"]))
         *         .then(... notify them that it succeeded ...)
         *
         * @return {Function} which returns the given value when called
         */
        return function squirt(value) {
            return function() {
                return value;
            };
        };
    })
    .factory("map", function() {
        /**
         * @ngdoc function
         * @name byng.module.functional-helpers.functional-helpers.map
         *
         * @description
         * Modifies the input with the given function
         *
         * useful for:
         * 
         *     asyncronouslyFetchUsernames = function() { ... }
         *     $q.when(asyncronouslyFetchUsernames)
         *         .then(map(ucfirst()));
         *
         *     // ["Alex", "Bo", "Chris"]
         *
         * @return {Function} which maps arrays using the given function
         */
        return function map(modifier) {
            return function (array) {
                return array.map(modifier);
            };
        };
    })
    .factory("concat", function() {
        /**
         * @ngdoc function
         * @name byng.module.functional-helpers.functional-helpers.concat
         *
         * @description
         * Joins the input into a single array, or wraps if its not an array
         *
         * useful for:
         *
         *     $q.all([
         *         fetchFoo(),
         *         fetchBar()
         *     ])
         *         .then(concat());
         *
         *     // [ foo1, foo2, bar1, bar2 ]
         *
         * or:
         *
         *     [ [ 1,2,3 ], [ 4,5,6 ] ]
         *         .reduce(concat())
         *     
         *     // [ 1,2,3,4,5,6 ]
         *
         * @return {Function} which returns a single array composed of the values
         */
        return function concat(modifier) {
            modifier = modifier || function(value) { return value; };
            return function () {
                var args = [].slice.call(arguments);
                var inputA = modifier(args[0]);
                var inputB = [];
                if (args.length > 1) {
                    inputB = modifier(args[1]);
                } else {
                    inputA = [].concat(inputA)
                        .reduce(function(a, b) {
                            return a.concat(b);
                        }, []);
                }
                return [].concat(inputA).concat(inputB);
            };
        };
    })
;
