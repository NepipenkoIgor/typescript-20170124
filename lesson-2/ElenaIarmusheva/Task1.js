/***
 Task#1
 Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
 Возвращает true, если все аргументы, кроме первого входят в первый.
 Первым всегда должен быть массив.
 ***/
function inInArray(arr) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
        var item = items_1[_a];
        if (arr.indexOf(item) < 0)
            return false;
    }
    return items.length !== 0;
}
console.log(inInArray([1, 2, 3], 1, 2, 3)); // true
console.log(inInArray(['a', 'b', 'c'], 'a', 'b', 'c')); // true
console.log(inInArray([1, 2, 3], 1, null, 3)); // false
