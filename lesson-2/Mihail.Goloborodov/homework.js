// 1
function isInArray(arr) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    return Array.isArray(arr) &&
        values.every(function (value) { return arr.indexOf(value) > -1; });
}
function isNumber(a) {
    return typeof a === 'number';
}
function toNumber(a) {
    return isNumber(a) ? a : parseInt(a, 10);
}
// 2
// есть ли другой способ, не используся as number реализовать сумматор через reduce?
function summator() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return values.reduce(function (a, b) { return toNumber(a) + toNumber(b); }, 0);
}
function summator2() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var sum = 0;
    values.forEach(function (value) {
        sum += toNumber(value);
    });
    return sum;
}
// 3
function getUnique(arr) {
    var result = [];
    Array.isArray(arr) && arr.forEach(function (value) {
        if (!isInArray(result, value)) {
            result.push(value);
        }
    });
    return result;
}
// 4
function reverseLettersInWords(str) {
    var words = str.split(' ');
    words.forEach(function (word, index) {
        words[index] = reverseLettersInWord(word);
    });
    return words.join(' ');
    function reverseLettersInWord(word) {
        var notLetter = '[^A-Za-zА-Яа-я]', notLetterRegExp = new RegExp(notLetter), result = '', letters = word.replace(new RegExp(notLetter, 'g'), '').split('');
        for (var i = 0; i < word.length; i++) {
            result += notLetterRegExp.test(word[i]) ? word[i] : letters.pop();
        }
        return result;
    }
}
console.log(reverseLettersInWords('s1tar3t 2 hellow') === 't1rat3s 2 wolleh');
console.log(reverseLettersInWords('s1ta$%r3t 2 hel^low') === 't1ra$%t3s 2 wol^leh');
console.log(reverseLettersInWords('s1tar3t 2   low5') === 't1rat3s 2   wol5');
