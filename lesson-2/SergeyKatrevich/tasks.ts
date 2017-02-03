/**
 * Created by LinkFly on 2/3/2017.
 */
// Utils
let log = console.log.bind(console);
let test = (mes: string, res, wait) => {
  const equalArray = (ar1: any[], ar2: any[]) => {
    if (ar1.length !== ar2.length) {
      return false;
    }
    let idx = 0;
    let result = true;
    for (const v1 of ar2) {
      if (v1 !== ar2[idx]) {
        result = false;
        break;
      }
      idx++;
    }
    return res;
  };

  const equal = (v1: any, v2: any): boolean => {
    if (Array.isArray(v1) && Array.isArray(v2)) {
      return equalArray(v1, v2);
    }
    return v1 === v2;
  };
  log(`\n${mes}.......\n\t${equal(res, wait) ? 'PASS' : 'FAIL'}`);
};

/*
1)
Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
  Возвращает true, если все аргументы, кроме первого входят в первый.
  Первым всегда должен быть массив.
  */
function isInArray(ar: any[], ...rest: any[]): boolean|void {
  for(const val of ar) {
    for (let i = 0; i < rest.length; i++) {
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

/*
2)
писать функцию summator(), которая сумирует переданые ей аргументы.
  Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено
  */

type NumOrStr = number|string;
function isString(num: NumOrStr): num is string {
  return typeof num === 'string';
}

function asNumber(num: NumOrStr): number {
  if (isString(num)) {
    return parseInt(num, 10);
  }
  return num;
}

function summator(...nums: (number|string)[]): number {
  return nums
    .map(asNumber)
    .reduce((a, b) => a + b);
}
test('summator: ', summator(1, '2', 3, '4'), 10);

/*3)
Написать функцию getUnique(arr), которая принимает аргументом неограниченое число аргументов,
  и возвращает массив уникальных элементов. Аргумент не должен изменяться.
  Порядок элементов результирующего массива должен совпадать с порядком,
  в котором они встречаются в оригинальной структуре.
  */
function getUnique(...arr) {
  const res = [] as any[];
  for (const val of arr) {
    if (res.indexOf(val) !== -1) {
      continue;
    }
    res.push(val);
  }
  return res;
}
test('getUnique: ', getUnique(1, 4, 2, 6, 4, 1, 2), [1, 4, 2, 6]);

/*4)
Написать функцию котороя будет разворачивать буквы в словах предложения, но только лишь буквы
цифры и специальные символы должны остаться на месте
s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
s1tar3t 2   low5  ->  t1rat3s 2   wol5
*/

function reverseWords(s: string): string {
  type char = string;
  const isLetter = (ch: char): null|RegExpMatchArray => {
    return ch.match(/[a-zA-Z]/);
  };
  let idx: number = 0;
  let idxRev: number = s.length - 1;
  let res = '';
  while (idx < s.length) {
    const nextCh: char = s[idx++];
    let nextRevCh: char;
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

