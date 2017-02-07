/*****
 Task#3
 Написать функцию getUnique(arr), которая принимает аргументом неограниченое число аргументов,
 и возвращает массив уникальных элементов. Аргумент не должен изменяться.
 Порядок элементов результирующего массива должен совпадать с порядком,
 в котором они встречаются в оригинальной структуре.
 *****/


type numStrBool = number | string | boolean;

function getUnique(...arr: numStrBool[]): numStrBool[] {
    let result: numStrBool[] = [];
    for (let a of arr) {
        if (result.indexOf(a) === -1) {
            result[result.length] = a;
        }
    }
    return result;
}


console.log(getUnique(1, 2, 3, 3, 2, 1, 5)); // 1,2,3,5
console.log(getUnique(1, 'a', false, 3, 2, 1, 5)); // 1, 'a', false, 3, 2, 5
console.log(getUnique(1, 'a', false, 'c', null, 1, 5)); // 1, 'a', false, 'c, null, 5