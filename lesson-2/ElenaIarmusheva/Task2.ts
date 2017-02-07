/***
 Task#2
 Написать функцию summator(), которая сумирует переданые ей аргументы.
 Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено
 ***/


function summator (...items: string[]): number | string;
function summator (...items: number[]): number | string;
function summator (...items: any[]): number | string {
    let result: number | string = undefined;
    for (let item of items) {
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