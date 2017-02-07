function isPrimArray(val) {
    return Array.isArray(val);
}
// Utils
var log = console.log.bind(console);
var test = function (mes, res, wait) {
    var equalArray = function (ar1, ar2) {
        if (ar1.length !== ar2.length) {
            return false;
        }
        var idx = 0;
        var result = true;
        for (var _i = 0, ar2_1 = ar2; _i < ar2_1.length; _i++) {
            var v1 = ar2_1[_i];
            if (v1 !== ar2[idx]) {
                result = false;
                break;
            }
            idx++;
        }
        return result;
    };
    var equal = function (v1, v2) {
        if (isPrimArray(v1) && isPrimArray(v2)) {
            return equalArray(v1, v2);
        }
        return v1 === v2;
    };
    log("\n" + mes + ".......\n\t" + (equal(res, wait) ? 'PASS' : 'FAIL'));
};
/*
1)
Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
  Возвращает true, если все аргументы, кроме первого входят в первый.
  Первым всегда должен быть массив.
  */
function isInArray(ar) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    for (var _a = 0, ar_1 = ar; _a < ar_1.length; _a++) {
        var val = ar_1[_a];
        for (var i = 0; i < rest.length; i++) {
            if (rest[i] === val) {
                rest.splice(i, 1);
                if (rest.length === 0) {
                    return true;
                }
                break;
            }
        }
    }
}
test('isInArray (test1): ', isInArray([2, 'a', 3, 'b'], 'a', 3), true);
test('isInArray (test2): ', isInArray([2, 'a', 3, 'b'], 3, 'x'), undefined);
function isString(num) {
    return typeof num === 'string';
}
function asNumber(num) {
    if (isString(num)) {
        return parseInt(num, 10);
    }
    return num;
}
function summator() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    return nums
        .map(asNumber)
        .reduce(function (a, b) { return a + b; });
}
test('summator: ', summator(1, '2', 3, '4'), 10);
/*3)
Написать функцию getUnique(arr), которая принимает аргументом неограниченое число аргументов,
  и возвращает массив уникальных элементов. Аргумент не должен изменяться.
  Порядок элементов результирующего массива должен совпадать с порядком,
  в котором они встречаются в оригинальной структуре.
  */
function getUnique() {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
    }
    var res = [];
    for (var _a = 0, arr_1 = arr; _a < arr_1.length; _a++) {
        var val = arr_1[_a];
        if (res.indexOf(val) !== -1) {
            continue;
        }
        res.push(val);
    }
    return res;
}
test('getUnique: ', getUnique(1, true, 4, "2", 6, true, 1, "2"), [1, true, 4, "2", 6]);
/*4)
Написать функцию котороя будет разворачивать буквы в словах предложения, но только лишь буквы
цифры и специальные символы должны остаться на месте
s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
s1tar3t 2   low5  ->  t1rat3s 2   wol5
*/
function reverseWords(s) {
    var isLetter = function (ch) {
        return ch.match(/[a-zA-Z]/);
    };
    var idx = 0;
    var idxRev = s.length - 1;
    var res = '';
    while (idx < s.length) {
        var nextCh = s[idx++];
        var nextRevCh = void 0;
        if (!isLetter(nextCh)) {
            res += nextCh;
            continue;
        }
        do {
            nextRevCh = s[idxRev--];
        } while (!isLetter(nextRevCh));
        res += nextRevCh;
    }
    return res;
}
test('reverseWords:', reverseWords('w2o ab3c rd'), 'd2r cb3a ow');
//# sourceMappingURL=tasks.js.map