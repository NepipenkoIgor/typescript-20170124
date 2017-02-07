/***
 Task#2
 Написать функцию summator(), которая сумирует переданые ей аргументы.
 Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено
 ***/
function summator() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    var result = undefined;
    for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
        var item = items_1[_a];
        if (result === undefined) {
            result = (typeof item === 'number') ? 0 : '';
        }
        result += item;
    }
    return result;
}
console.log(summator(1, 2, 3)); // 6
console.log(summator('a', 'b', 'c')); // abc
console.log(summator('1', '2', '3')); // abc
console.log(summator()); // undefined
