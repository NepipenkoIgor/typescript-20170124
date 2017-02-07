/***
 Task#1
 Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
 Возвращает true, если все аргументы, кроме первого входят в первый.
 Первым всегда должен быть массив.
 ***/

type numOrStrOrBool = number | string | boolean;

function inInArray (arr: numOrStrOrBool[], ...items: numOrStrOrBool[]): boolean {
    for (let item of items) {
        if (arr.indexOf(item) < 0 ) return false;
    }
    return items.length !== 0;
}

console.log(inInArray([1, 2, 3], 1, 2, 3));  // true
console.log(inInArray(['a', 'b', 'c'], 'a', 'b', 'c')); // true
console.log(inInArray([1, 2, 3], 1, null, 3)); // false