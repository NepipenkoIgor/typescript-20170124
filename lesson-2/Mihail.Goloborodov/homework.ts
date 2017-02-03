function isInArray(arr: any[], ...values: any[]): boolean {
  return Array.isArray(arr) &&
         values.every((value) => arr.indexOf(value) > -1);
}

type numberOrString = number|string;

function isNumber(a: numberOrString): a is number {
  return typeof a === 'number';
}

// почему нельзя так? это же так красиво =)
// function summator(...values: numberOrString[]): number {
//   return values.reduce((a, b) => {a + b}, 0);
// }

function summator(...values: numberOrString[]): number {
  let sum: number = 0;

  values.forEach((value) => {
    if (isNumber(value)) {
      sum += value;
      return;
    }
    sum += parseInt(value, 10);
  });

  return sum;
}

function getUnique(arr: any[]): any[] {
  let result = [];

  Array.isArray(arr) && arr.forEach((value) => {
    if (!isInArray(result, value)) {
      result.push(value);
    }
  });

  return result;
}

function turnLettersInWords(str: string): string {
  let words: string[] = str.split(' ');

  words.forEach((word, index) => {
    words[index] = turnLettersInWord(word);
  });

  return words.join(' ');

  function turnLettersInWord(word: string): string {
    let result: string[] = word.split(''),
        l = word.length,
        regExp = /[A-Za-z]/;

    for  (let i = 0; i < l; i++) {
      if (regExp.test(word[i])) {
        result[l - i - 1] = word[i];
        continue;
      }
      result[i] = word[i];
    }

    return result.join('');
  }
}

console.log(turnLettersInWords('s1tar3t 2 hellow'));