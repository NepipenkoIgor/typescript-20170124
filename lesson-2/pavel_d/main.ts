type ns = number|string;
type nsb = ns|boolean;

// ********** Task 1 **********

function isInArray(a: nsb[], ...b: nsb[]): boolean {
  const aLen: number = a.length;
  const bLen: number = b.length;
  if (bLen > aLen) {
    return false;
  }

  let foundIndexes: boolean[] = new Array(aLen);
  let found: number = 0;
  for (let i = 0; i < bLen; i += 1) {
    for (let j = 0; j < aLen; j += 1) {
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

function isString(a: ns): a is string {
  return (typeof a === 'string');
}

function summator(...a: number[]): number;
function summator(...a: string[]): number;
function summator(...a: ns[]): number;

function summator(...a: ns[]): number {
  let total: number = 0;
  a.forEach((item) => {
    total += isString(item) ? parseInt(item, 10) : item;
  });
  return total;
}

// ********** Task 3 **********

function getUnique(...a: nsb[]): nsb[] {
  let result: nsb[] = [];
  a.forEach((item) => {
    if (~result.indexOf(item)) {
      return;
    }
    result.push(item);
  });
  return result;
}

// ********** Task 4 **********

function reverseSentence(a: string): string {
  let words: string[] = a.split(' ');

  words.forEach((item, n) => {
    const word: string[] = item.split('');
    const l: number = word.length;

    if (l < 2) {
      return;
    }

    let numbers: number[] = [];
    let letters: string[] = [];
    for (let i = 0; i < l; i += 1) {
      if (!/[a-z]/i.test(word[i])) {
        continue;
      }
      letters.push(word[i]);
      numbers.push(i);
    }

    numbers.reverse().forEach((num, i) => {
      word[num] = letters[i];
    });

    words[n] = word.join('');
  });

  return words.join(' ');
}

// ********** Testing **********

console.log('Test task 1');
console.log(isInArray([1, '4', 2, 3, false, 'hello'], false, 1, 3, '4'));  // true
console.log(isInArray([1, '4', 2, 3, false, 'hello'], false, 1, 3, '2'));  // false
console.log(isInArray([1, 2, 2, 2], 2));  // true
console.log(isInArray([1, 2, 1], 2, 1, 1));  // true
console.log(isInArray([]));  // true

console.log('Test task 2');
console.log(summator());  // 0
console.log(summator('1', 2, '20'));  // 23

console.log('Test task 3');
console.log(getUnique());  // []
console.log(getUnique('1', 2, false, 2, 1, 'hi', false, 3, '1'));  // '1', 2, false, 1, 'hi', 3

console.log('Test task 4');
console.log(reverseSentence('s1tar3t 2 hellow'));  // t1rat3s 2 wolleh
console.log(reverseSentence('s1ta$%r3t 2 hel^low'));  // t1ra$%t3s 2 wol^leh
console.log(reverseSentence('s1tar3t 2   low5'));  // t1rat3s 2   wol5