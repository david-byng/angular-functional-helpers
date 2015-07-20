describe("byng.module.functional-helpers.functional-helpers", function() {
    var truthy;
    var falsy;

    beforeEach(function() {
        module("byng.module.functional-helpers.service.functional-helpers");

        truthy = jasmine.createSpy("truthy").and.returnValue(true);
        falsy = jasmine.createSpy("falsy").and.returnValue(false);
    });

    describe("unique", function() {
        var unique;

        beforeEach(function() {
            inject(function(_unique_) {
                unique = _unique_;
            });
        });

        it("should be a function", function() {
            expect(unique).toEqual(jasmine.any(Function));
        });

        it("should return true if the given value is the first instance in the array", function() {
            expect(unique("a", 0, ["a", "b", "a"])).toBe(true);
        });

        it("should return false if the given value is not the first instance in the array", function() {
            expect(unique("a", 2, ["a", "b", "a"])).toBe(false);
        });
    });

    describe("contains", function() {
        var contains;

        beforeEach(function() {
            inject(function(_contains_) {
                contains = _contains_;
            });
        });

        it("should be a function", function() {
            expect(contains).toEqual(jasmine.any(Function));
        });

        it("should return true if a given value is in subsequent array", function() {
            var value = "test";
            var array = [1, 2, "test", 3];

            expect(contains(value)(array)).toBe(true);
        });

        it("should return false if a given value is not in a subsequent array", function() {
            var value = "test";
            var array = [1, 2, 3];

            expect(contains(value)(array)).toBe(false);
        });

        it("should return true if a given substring is in a subsequent value", function() {
            var needle = "test";
            var haystack = "testing";

            expect(contains(needle)(haystack)).toBe(true);
        });

        it("should return false if a given substring is not in a subsequent value", function() {
            var needle = "test";
            var haystack = "swordfish";

            expect(contains(needle)(haystack)).toBe(false);
        });
    });

    describe("startsWith", function() {
        var startsWith;

        beforeEach(function() {
            inject(function(_startsWith_) {
                startsWith = _startsWith_;
            });
        });

        it("should be a function", function() {
            expect(startsWith).toEqual(jasmine.any(Function));
        });

        it("should return true if a given value is first in a subsequent array", function() {
            var value = 1;
            var array = [1, 2, "test", 3];

            expect(startsWith(value)(array)).toBe(true);
        });

        it("should return false if a given value is not in a subsequent array", function() {
            var value = "test";
            var array = [1, 2, 3];

            expect(startsWith(value)(array)).toBe(false);
        });

        it("should return false if a given value is not first in a subsequent array", function() {
            var value = 2;
            var array = [1, 2, 3];

            expect(startsWith(value)(array)).toBe(false);
        });

        it("should return true if a subsequent value starts with a given substring", function() {
            var needle = "test";
            var haystack = "testing";

            expect(startsWith(needle)(haystack)).toBe(true);
        });

        it("should return false if a given substring is not in a subsequent value", function() {
            var needle = "test";
            var haystack = "swordfish";

            expect(startsWith(needle)(haystack)).toBe(false);
        });

        it("should return false if a given value does not start with the substring", function() {
            var needle = "fish";
            var haystack = "swordfish";

            expect(startsWith(needle)(haystack)).toBe(false);
        });
    });

    describe("containedIn", function() {
        var containedIn;

        beforeEach(function() {
            inject(function(_containedIn_) {
                containedIn = _containedIn_;
            });
        });

        it("should be a function", function() {
            expect(containedIn).toEqual(jasmine.any(Function));
        });

        it("should return true if a given value is in subsequent array", function() {
            var value = "test";
            var array = [1, 2, "test", 3];

            expect(containedIn(array)(value)).toBe(true);
        });

        it("should return false if a given value is not in a subsequent array", function() {
            var value = "test";
            var array = [1, 2, 3];

            expect(containedIn(array)(value)).toBe(false);
        });
    });

    describe("not", function() {
        var not;

        beforeEach(function() {
            inject(function(_not_) {
                not = _not_;
            });

        });

        it("should be a function", function() {
            expect(not).toEqual(jasmine.any(Function));
        });

        it("should return true if the given function returns false", function() {
            expect(not(falsy)()).toBe(true);
        });

        it("should return false if the given function returns true", function() {
            expect(not(truthy)()).toBe(false);
        });
    });

    describe("isTruthy", function() {
        var isTruthy;

        beforeEach(function() {
            inject(function(_isTruthy_) {
                isTruthy = _isTruthy_;
            });
        });

        it("should be a function", function() {
            expect(isTruthy).toEqual(jasmine.any(Function));
        });

        it("should return true if the given value is truthy", function() {
            expect(isTruthy()(1)).toBe(true);
            expect(isTruthy()(true)).toBe(true);
            expect(isTruthy()("true")).toBe(true);
        });

        it("should return false if the given value is falsy", function() {
            expect(isTruthy()()).toBe(false);
            expect(isTruthy()(0)).toBe(false);
            expect(isTruthy()("")).toBe(false);
        });
    });

    describe("isDefined", function() {
        var isDefined;

        beforeEach(function() {
            inject(function(_isDefined_) {
                isDefined = _isDefined_;
            });
        });

        it("should be a function", function() {
            expect(isDefined).toEqual(jasmine.any(Function));
        });

        it("should return true if the given value is defined", function() {
            expect(isDefined()(1)).toBe(true);
        });

        it("should return false if the given value is undefined", function() {
            expect(isDefined()()).toBe(false);
        });
    });

    describe("pluck", function() {
        var pluck;

        beforeEach(function() {
            inject(function(_pluck_) {
                pluck = _pluck_;
            });
        });

        it("should be a function", function() {
            expect(pluck).toEqual(jasmine.any(Function));
        });

        it("should return the key selected from the given object", function() {
            var obj = {foo: "bar"};
            expect(pluck("foo")(obj)).toBe("bar");
        });
    });

    describe("pluckFrom", function() {
        var pluckFrom;

        beforeEach(function() {
            inject(function(_pluckFrom_) {
                pluckFrom = _pluckFrom_;
            });
        });

        it("should return the property on the given object", function() {
            var propertyName = "test";
            var retval = {};
            var obj = {};
            obj[propertyName] = retval;

            expect(pluckFrom(obj)(propertyName)).toBe(retval);
        });
    });

    describe("callMethod", function() {
        var callMethod;

        beforeEach(function() {
            inject(function(_callMethod_) {
                callMethod = _callMethod_;
            });
        });

        it("should be a function", function() {
            expect(callMethod).toEqual(jasmine.any(Function));
        });

        it("should call the method on the given object", function() {
            var methodName = "test";
            var retval = {};
            var obj = {};
            obj[methodName] = jasmine.createSpy(methodName).and.returnValue(retval);

            expect(callMethod(methodName)(obj)).toBe(retval);

            expect(obj[methodName]).toHaveBeenCalled();
        });
    });

    describe("pipe", function() {
        var pipe;

        beforeEach(function() {
            inject(function(_pipe_) {
                pipe = _pipe_;
            });
        });

        it("should be a function", function() {
            expect(pipe).toEqual(jasmine.any(Function));
        });

        it("should call each method in turn", function() {
            var methodOne = jasmine.createSpy("methodOne");
            var methodOneRetval = "foo";
            var methodTwo = jasmine.createSpy("methodTwo");
            var methodTwoRetval = "bar";
            methodOne.and.returnValue(methodOneRetval);
            methodTwo.and.returnValue(methodTwoRetval);
            var input = "input";

            expect(pipe(methodOne, methodTwo)(input)).toBe(methodTwoRetval);
            expect(methodOne).toHaveBeenCalledWith(input);
            expect(methodTwo).toHaveBeenCalledWith(methodOneRetval);
        });
    });

    describe("callWith", function() {
        var callWith;

        beforeEach(function() {
            inject(function(_callWith_) {
                callWith = _callWith_;
            });
        });

        it("should be a function", function() {
            expect(callWith).toEqual(jasmine.any(Function));
        });

        it("should pass the arguments to the given function", function() {
            var args = [1, 2, 3];
            var retval = {};
            var method = jasmine.createSpy("method").and.returnValue(retval);

            expect(callWith(args)(method)).toBe(retval);

            expect(method).toHaveBeenCalledWith(1, 2, 3);
        });
    });

    describe("allOf", function() {
        var allOf;

        beforeEach(function() {
            inject(function(_allOf_) {
                allOf = _allOf_;
            });
        });

        it("should be a function", function() {
            expect(allOf).toEqual(jasmine.any(Function));
        });

        it("should return true if all passed functions return true", function() {
            expect(allOf(truthy, truthy, truthy)()).toBe(true);
        });

        it("should pass arguments through", function() {
            var foo = {};

            allOf(truthy)(foo, foo);

            expect(truthy).toHaveBeenCalledWith(foo, foo);
        });
    });

    describe("ucfirst", function() {
        var ucfirst;

        beforeEach(function() {
            inject(function(_ucfirst_) {
                ucfirst = _ucfirst_;
            });
        });

        it("should be a function", function() {
            expect(ucfirst).toEqual(jasmine.any(Function));
        });

        it("should return a string with the first letter capitalised", function() {
            var camelCase = "fooBar";
            var pascalCase = "FooBar";

            expect(ucfirst()(camelCase)).toEqual(pascalCase);
        });
    });

    describe("squirt", function() {
        var squirt;

        beforeEach(function() {
            inject(function(_squirt_) {
                squirt = _squirt_;
            });
        });

        it("should be a function", function() {
            expect(squirt).toEqual(jasmine.any(Function));
        });

        it("should return the given value when called", function() {
            var value = {};

            expect(squirt(value)()).toBe(value);
        });
    });

    describe("map", function() {
        var map;

        beforeEach(function() {
            inject(function(_map_) {
                map = _map_;
            });
        });

        it("should be a function", function() {
            expect(map).toEqual(jasmine.any(Function));
        });
        
        it("should map the given function on the input array", function() {
            var value = {};
            var newValue = {};
            var func = jasmine.createSpy("func")
                .and.returnValue(value);
            var input = [ value ];

            expect(map(func)(input)).toEqual([ newValue ]);

            expect(func).toHaveBeenCalledWith(value, 0, input);
        });
    });

    describe("concat", function() {
        var concat;

        beforeEach(function() {
            inject(function(_concat_) {
                concat = _concat_;
            });
        });

        it("should be a function", function() {
            expect(concat).toEqual(jasmine.any(Function));
        });

        it("should join inputs together into a single array", function() {
            var inputA = [1,2,3];
            var inputB = ["a", "b", "c"];

            expect(concat()([inputA, inputB])).toEqual([].concat(inputA).concat(inputB));
        });

        it("should handle being in a reduce call", function() {
            var input = [[1,2,3],[4,5,6]];
            input.reduce(concat());
        });
    });
});
