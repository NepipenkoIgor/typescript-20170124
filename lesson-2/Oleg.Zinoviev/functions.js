// 1
function isInArray(subject) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    return params.every(function (item) { return subject.indexOf(item) !== -1; });
}
// 2
function summator() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    params = params.map(function (item) {
        if (isString(item)) {
            item = parseFloat(item);
        }
        return item;
    });
    return (params.reduce(function (pv, nv) {
        return pv + nv;
    }));
}
// 3
function getUnique() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    return params.reduce(pushToArrayIfUnique, []);
}
function pushToArrayIfUnique(data, param) {
    if (!data.includes(param)) {
        data.push(param);
    }
    return data;
}
// 4
function reverseWords(str) {
    var temp = str.split(' ');
    var result = [];
    for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
        var item = temp_1[_i];
        result.push(reverseWord(item));
    }
    return result.join(' ');
}
function reverseWord(str) {
    var symbols = str.split('');
    for (var i = 0; i < symbols.length; i++) {
        if (!isLetter(symbols[i])) {
            symbols.splice(i, 1, '');
        }
    }
    // Remove empty elements and reverse
    symbols = symbols.join('').split('');
    symbols.reverse();
    // Adding missing special symbols from original str
    for (var j = 0; j < str.length; j++) {
        if (!isLetter(str[j])) {
            symbols.splice(j, 0, str[j]);
        }
    }
    return symbols.join('');
}
function isLetter(str) {
    return (str.length === 1 && str.match(/[a-z]/i));
}
function isString(value) {
    return typeof value === 'string';
}
// Invoke here
console.log(isInArray(['a', 'b', 'c'], 'a', 'b')); // -> true
console.log(summator(7, '15', '12')); // -> 34
console.log(getUnique(5, 5, 10, '7', '7', false, false, true)); // -> [ 5, 10, '7', false, true ]
console.log(reverseWords('s1tar3t 2 hellow')); //  ->  t1rat3s 2 wolleh
console.log(reverseWords('s1ta$%r3t 2 hel^low')); //  ->  t1ra$%t3s 2 wol^leh
console.log(reverseWords('s1tar3t 2   low5')); //  ->  t1rat3s 2   wol5
