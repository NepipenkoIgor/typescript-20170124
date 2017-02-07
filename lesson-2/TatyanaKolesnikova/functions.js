function isInArray(arr) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    for (var _a = 0, rest_1 = rest; _a < rest_1.length; _a++) {
        var item = rest_1[_a];
        if (arr.indexOf(item) === -1) {
            return false;
        }
    }
    return true;
}
function summator() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    var res = 0;
    for (var _a = 0, numbers_1 = numbers; _a < numbers_1.length; _a++) {
        var num = numbers_1[_a];
        res += isNaN(+num) ? 0 : +num;
    }
    return res;
}
function getUnique() {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
    }
    var res = [];
    for (var _a = 0, arr_1 = arr; _a < arr_1.length; _a++) {
        var item = arr_1[_a];
        if (!isInArray(res, item)) {
            res.push(item);
        }
    }
    return res;
}
function isABC(str, pos) {
    var code = str[pos].toLowerCase().charCodeAt(0);
    return code > 96 && code < 123;
}
function reverse(str) {
    var arr = str.split(' ');
    var newArr = [];
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var item = arr_2[_i];
        var word = item;
        var size = Math.floor(word.length / 2);
        for (var i = 0; i < size; ++i) {
            var iFrom = i;
            var iTo = word.length - i - 1;
            if (isABC(word, iFrom) && isABC(word, iTo)) {
                word = word.slice(0, iFrom) + word[iTo] + word.slice(iFrom + 1, iTo) + word[iFrom] + word.slice(iTo + 1);
            }
        }
        newArr.push(word);
    }
    return newArr.join(' ');
}
