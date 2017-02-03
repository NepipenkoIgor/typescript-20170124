function summator(...numbers: (number | string)[]): number {
    let sum: number = 0;
    for (let num of numbers) {
        num = Number(num);
        if (isNaN(num)) {
            continue;
        }
        sum += num;
    }
    return sum;
}

function isNumberArray(input: number[] | string[]): input is number[] {
    for (let item of input) {
        if (typeof item !== 'number') {
            return false;
        }
    }
    return true;
}

function isStringArray(input: number[] | string[]): input is string[] {
    for (let item of input) {
        if (typeof item !== 'string') {
            return false;
        }
    }
    return true;
}

// вопрос: можно ли в функции имплементации в данном случае указать тип для rest парараметра как:
// массив строк либо массив чисел (чтобы избежать использования массива any) ?
// ?????
function summator2(...numbers: number[]);
function summator2(...numbers: string[]);
function summator2(...numbers: (number | string)[]  ) {
    let sum: number = 0,
        isNum = isNumberArray(numbers),
        isStr = isStringArray(numbers);

    if (!isNum && !isStr) {
        return sum; // элементы в массиве отличны от string | number
    }

    for (let num of numbers) {
        sum += isStr ? !isNaN(Number(num)) ? Number(num) : 0 : num;
    }

    return sum;
}

console.log(`'1', 'asd', '13', '1': ${summator2('1','asd', '13', '1')}`);
console.log(`1, 2, 4, 9: ${summator2(1, 2, 4, 9)}`);
console.log(`'1', 'asd', 13, 9: ${summator('1','asd', 13, 9)}`);