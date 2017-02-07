// 1)
//   Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
//   Возвращает true, если все аргументы, кроме первого входят в первый.
//   Первым всегда должен быть массив.
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.isInArray = function (arr) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return values.every(function (item) { return arr.indexOf(item) !== -1; });
    };
    Utils.prototype.summator = function () {
        var numbers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            numbers[_i] = arguments[_i];
        }
        var total = 0;
        for (var i = 0, len = numbers.length; i < len; i++) {
            var element = numbers[i];
            if (this._isString(element)) {
                total += parseInt(element, 10);
            }
            else if (this._isNumber(element)) {
                total += element;
            }
        }
        return total;
    };
    Utils.prototype.getUnique = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        return values.filter(onlyUnique);
    };
    Utils.prototype.reversePhrase = function (phrase) {
        var phraseSplitted = phrase.split(" ");
        var reversedArr = [];
        for (var i = 0, len = phraseSplitted.length; i < len; i++) {
            reversedArr.push(this._reverseWord(phraseSplitted[i]));
        }
        return reversedArr.join(" ");
    };
    Utils.prototype._isLetter = function (letter) {
        var lettersRegex = /[a-z]/i;
        return lettersRegex.test(letter);
    };
    Utils.prototype._reverseWord = function (word) {
        var resultArr = [];
        for (var i = 0, len = word.length; i <= len; i++) {
            if (!this._isLetter(word[i])) {
                resultArr.push(word.charAt(i));
                continue;
            }
            resultArr.push(word.charAt(len - (i + 1)));
        }
        return resultArr.join("");
    };
    Utils.prototype._isString = function (a) {
        if (typeof a === 'string') {
            return true;
        }
        return false;
    };
    Utils.prototype._isNumber = function (a) {
        if (typeof a === 'number') {
            return true;
        }
        return false;
    };
    return Utils;
}());
var utilities = new Utils();
//console.log(utilities.isInArray([1,2,3,4,5], 4,5,1,2,3));
//console.log(utilities.summator(1,2,'3'));
//console.log(utilities.getUnique(1,2,3,4,3,5,5));
// console.log(utilities.reversePhrase('s1tar3t 2 hellow'));
// console.log(utilities.reversePhrase('s1ta$%r3t 2 hel^low'));
// console.log(utilities.reversePhrase('s1tar3t 2   low5')); 
