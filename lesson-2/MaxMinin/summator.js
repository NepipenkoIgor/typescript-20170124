function summator() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    var sum = 0;
    for (var _a = 0, numbers_1 = numbers; _a < numbers_1.length; _a++) {
        var num = numbers_1[_a];
        num = Number(num);
        if (isNaN(num)) {
            continue;
        }
        sum += num;
    }
    return sum;
}
function isNumberArray(input) {
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var item = input_1[_i];
        if (typeof item !== 'number') {
            return false;
        }
    }
    return true;
}
function isStringArray(input) {
    for (var _i = 0, input_2 = input; _i < input_2.length; _i++) {
        var item = input_2[_i];
        if (typeof item !== 'string') {
            return false;
        }
    }
    return true;
}
function summator2() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    var sum = 0, isNum = isNumberArray(numbers), isStr = isStringArray(numbers);
    if (!isNum && !isStr) {
        return sum; // элементы в массиве отличны от string | number
    }
    for (var _a = 0, numbers_2 = numbers; _a < numbers_2.length; _a++) {
        var num = numbers_2[_a];
        sum += isStr ? !isNaN(Number(num)) ? Number(num) : 0 : num;
    }
    return sum;
}
console.log("'1', 'asd', '13', '1': " + summator2('1', 'asd', '13', '1'));
console.log("1, 2, 4, 9: " + summator2(1, 2, 4, 9));
console.log("'1', 'asd', 13, 9: " + summator('1', 'asd', 13, 9));
