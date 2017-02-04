var isInArray = function (array) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var arg = args_1[_a];
        if (array.indexOf(arg) === -1) {
            return false;
        }
    }
    return true;
};
var arrayToCheck = [
    'abc',
    123,
    false
];
console.log(isInArray(arrayToCheck, 'abc', 123, false));
