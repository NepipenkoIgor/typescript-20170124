function isNumberList(list) {
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var item = list_1[_i];
        if (typeof item !== 'number') {
            return false;
        }
    }
    return true;
}
function isStringList(list) {
    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
        var item = list_2[_i];
        if (typeof item !== 'string') {
            return false;
        }
    }
    return true;
}
function summator() {
    var list = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        list[_i] = arguments[_i];
    }
    if (isNumberList(list)) {
        var result = 0;
        for (var _a = 0, list_3 = list; _a < list_3.length; _a++) {
            var item = list_3[_a];
            result += item;
        }
        return result;
    }
    else if (isStringList(list)) {
        var result = '';
        for (var _b = 0, list_4 = list; _b < list_4.length; _b++) {
            var item = list_4[_b];
            result += item;
        }
        return result;
    }
}
//  Такой вызов невозможен:
//  summator('test', 123);
//  Такие вызовы работают:
//console.log(summator('test', ' ', 'summator', ' ', 'hello', '!'));  // test summator hello!
//console.log(summator(4,5,6,7,8,100000)); // 100030
//  Это спорно, но работает:
//console.log(summator()); // 0
