// 1)
//   Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
//   Возвращает true, если все аргументы, кроме первого входят в первый.
//   Первым всегда должен быть массив.


// 2)
//  писать функцию summator(), которая сумирует переданые ей аргументы.
//  Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено


// 3)
//   Написать функцию getUnique(arr), которая принимает аргументом неограниченое число аргументов,
//   и возвращает массив уникальных элементов. Аргумент не должен изменяться.
//   Порядок элементов результирующего массива должен совпадать с порядком,
//   в котором они встречаются в оригинальной структуре.

// 4)
//    Написать функцию котороя будет разворачивать буквы в словах предложения, но только лишь буквы
//    цифры и специальные символы должны остаться на месте
//       s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
//       s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
//       s1tar3t 2   low5  ->  t1rat3s 2   wol5

type ns = number|string;

class Utils {

    public isInArray(arr: any[], ...values: any[]): boolean {
        return values.every((item: any) => arr.indexOf(item) !== -1);
    }

    public summator(...numbers: ns[]): number {
        let total: number = 0;
        for (let i = 0, len = numbers.length; i < len; i++) {
            let element: ns = numbers[i];
            if (this._isString(element)) {
                total += parseInt(element, 10);
            } else if (this._isNumber(element)) {
                total += element;
            }
        }
        return total;
    }

    public getUnique(...values: any[]): any[] {
        function onlyUnique(value, index, self) { 
            return self.indexOf(value) === index;
        }
        return values.filter(onlyUnique);
    }

    public reversePhrase(phrase: string): string {
        let phraseSplitted = phrase.split(" ");
        let reversedArr: any[] = [];
        for (let i = 0, len = phraseSplitted.length; i < len; i++) {
            reversedArr.push(this._reverseWord(phraseSplitted[i]));
        }
        return reversedArr.join(" ");
    }

    private _isLetter(letter: string): boolean {
        let lettersRegex = /[a-z]/i;
        return lettersRegex.test(letter);
    }

    private _reverseWord(word: string): string {
        let resultArr: string[] = [];
        for (let i = 0, len = word.length; i <= len; i++) {
            if(!this._isLetter(word[i])) {
                resultArr.push(word.charAt(i));
                continue;
            } 
            resultArr.push(word.charAt(len - (i + 1)));
        }
        return resultArr.join("");
    }

    private _isString(a: ns): a is string {
        if (typeof a === 'string') {
            return true;
        }
        return false;
    }

    private _isNumber(a: ns): a is number {
        if (typeof a === 'number') {
            return true;
        }
        return false;
    }
}

let utilities = new Utils();
//console.log(utilities.isInArray([1,2,3,4,5], 4,5,1,2,3));
//console.log(utilities.summator(1,2,'3'));
//console.log(utilities.getUnique(1,2,3,4,3,5,5));
// console.log(utilities.reversePhrase('s1tar3t 2 hellow'));
// console.log(utilities.reversePhrase('s1ta$%r3t 2 hel^low'));
// console.log(utilities.reversePhrase('s1tar3t 2   low5'));