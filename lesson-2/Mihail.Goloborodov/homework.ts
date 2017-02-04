// 1
function isInArray(arr: any[], ...values: any[]): boolean {
  return Array.isArray(arr) &&
         values.every((value) => arr.indexOf(value) > -1);
}

type numberOrString = number|string;

function isNumber(a: numberOrString): a is number {
  return typeof a === 'number';
}

function toNumber(a: numberOrString): number {
  return isNumber(a) ? a : parseInt(a, 10) as number;
}

// 2
// есть ли другой способ, не используся as number реализовать сумматор через reduce?
function summator(...values: numberOrString[]): number {
  return values.reduce((a, b) => toNumber(a) + toNumber(b), 0) as number;
}

function summator2(...values: numberOrString[]): number {
  let sum: number = 0;

  values.forEach((value) => {
    sum += toNumber(value);
  });

  return sum;
}

// 3
function getUnique(arr: any[]): any[] {
  let result = [];

  Array.isArray(arr) && arr.forEach((value) => {
    if (!isInArray(result, value)) {
      result.push(value);
    }
  });

  return result;
}

// 4
function reverseLettersInWords(str: string): string {
  let words: string[] = str.split(' ');

  words.forEach((word, index) => {
    words[index] = reverseLettersInWord(word);
  });

  return words.join(' ');

  function reverseLettersInWord(word: string): string {
    let notLetter = '[^A-Za-zА-Яа-я]',
        notLetterRegExp = new RegExp(notLetter),
        result: string = '',
        letters: string[] = word.replace(new RegExp(notLetter, 'g'), '').split('');

    for (let i = 0; i < word.length; i++) {
      result += notLetterRegExp.test(word[i]) ? word[i] : letters.pop();
    }

    return result;
  }
}

console.log(reverseLettersInWords('s1tar3t 2 hellow') === 't1rat3s 2 wolleh');
console.log(reverseLettersInWords('s1ta$%r3t 2 hel^low') === 't1ra$%t3s 2 wol^leh');
console.log(reverseLettersInWords('s1tar3t 2   low5') === 't1rat3s 2   wol5');