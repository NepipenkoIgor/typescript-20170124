// ********** Task 1 **********
function isInArray(a) {
    var b = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        b[_i - 1] = arguments[_i];
    }
    var aLen = a.length;
    var bLen = b.length;
    if (bLen > aLen) {
        return false;
    }
    var foundIndexes = new Array(aLen);
    var found = 0;
    for (var i = 0; i < bLen; i += 1) {
        for (var j = 0; j < aLen; j += 1) {
            if (a[j] !== b[i] || foundIndexes[j]) {
                continue;
            }
            foundIndexes[j] = true;
            found += 1;
            break;
        }
    }
    return bLen === found;
}
// ********** Task 2 **********
function isString(a) {
    return (typeof a === 'string');
}
function summator() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    var total = 0;
    a.forEach(function (item) {
        total += isString(item) ? parseInt(item, 10) : item;
    });
    return total;
}
// ********** Task 3 **********
function getUnique() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    var result = [];
    a.forEach(function (item) {
        if (~result.indexOf(item)) {
            return;
        }
        result.push(item);
    });
    return result;
}
// ********** Task 4 **********
function reverseSentence(a) {
    var words = a.split(' ');
    words.forEach(function (item, n) {
        var word = item.split('');
        var l = word.length;
        if (l < 2) {
            return;
        }
        var numbers = [];
        var letters = [];
        for (var i = 0; i < l; i += 1) {
            if (!/[a-z]/i.test(word[i])) {
                continue;
            }
            letters.push(word[i]);
            numbers.push(i);
        }
        numbers.reverse().forEach(function (num, i) {
            word[num] = letters[i];
        });
        words[n] = word.join('');
    });
    return words.join(' ');
}
// ********** Testing **********
console.log('Test task 1');
console.log(isInArray([1, '4', 2, 3, false, 'hello'], false, 1, 3, '4')); // true
console.log(isInArray([1, '4', 2, 3, false, 'hello'], false, 1, 3, '2')); // false
console.log(isInArray([1, 2, 2, 2], 2)); // true
console.log(isInArray([1, 2, 1], 2, 1, 1)); // true
console.log(isInArray([])); // true
console.log('Test task 2');
console.log(summator()); // 0
console.log(summator('1', 2, '20')); // 23
console.log('Test task 3');
console.log(getUnique()); // []
console.log(getUnique('1', 2, false, 2, 1, 'hi', false, 3, '1')); // '1', 2, false, 1, 'hi', 3
console.log('Test task 4');
console.log(reverseSentence('s1tar3t 2 hellow')); // t1rat3s 2 wolleh
console.log(reverseSentence('s1ta$%r3t 2 hel^low')); // t1ra$%t3s 2 wol^leh
console.log(reverseSentence('s1tar3t 2   low5')); // t1rat3s 2   wol5
