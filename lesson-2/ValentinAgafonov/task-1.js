"use strict";
function isInArray(list, firstElement) {
    var otherElements = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        otherElements[_i - 2] = arguments[_i];
    }
    var elements = [firstElement].concat(otherElements);
    for (var _a = 0, elements_1 = elements; _a < elements_1.length; _a++) {
        var element_1 = elements_1[_a];
        var hasElement = false;
        for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
            var item = list_1[_b];
            if (item === element_1) {
                hasElement = true;
            }
        }
        if (!hasElement) {
            return false;
        }
    }
    return true;
}
exports.isInArray = isInArray;
//  Такие вызовы невозможны:
//  isInArray(1);
//  isInArray();
//  isInArray(1,2,3,4);
//  isInArray([1,2,3,4]);
//  isInArray([{a:1}], {a:1});
//  Такие вызовы работают:
//console.log(isInArray([1,2,3,4],2));  // true
//console.log(isInArray([7,8,9],7,8,9));  // true
//console.log(isInArray([7,8,9],7,8,9,1));  // false
//console.log(isInArray([],1));  // false
