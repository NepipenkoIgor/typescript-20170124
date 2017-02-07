type ns = number | string;
type nsb = ns | boolean;

// 1
function isInArray(subject: string[], ...params: string[]): boolean {
    return params.every((item: string) => subject.indexOf(item) !== -1);
}

// 2
function summator(...params: ns[]): number {
    params = params.map(item => {
        if (isString(item)) {
            item = parseFloat(item);
        }
        return item;
    });
    return (params.reduce((pv: number, nv: number) => {
        return pv + nv;
    })) as number;
}

// 3
function getUnique(...params: nsb[]): nsb[] {
    return params.reduce(pushToArrayIfUnique, []);
}

function pushToArrayIfUnique(data: nsb[], param: nsb): nsb[] {
    if (!data.includes(param)) {
        data.push(param);
    }
    return data;
}

// 4
function reverseWords(str: string) {
    let temp: string[] = str.split(' ');
    let result: string[] = [];

    for (let item of temp) {
        result.push(reverseWord(item));
    }
    return result.join(' ');
}

function reverseWord(str: string): string {
    let symbols: string[] = str.split('');

    for (let i = 0; i < symbols.length; i++) {
        if (!isLetter(symbols[i])) {
            symbols.splice(i, 1, '');
        }
    }
    // Remove empty elements and reverse
    symbols = symbols.join('').split('');
    symbols.reverse();

    // Adding missing special symbols from original str
    for (let j = 0; j < str.length; j++) {
        if (!isLetter(str[j])) {
            symbols.splice(j, 0, str[j]);
        }
    }
    return symbols.join('');
}
function isLetter(str: string): boolean {
    return (str.length === 1 && str.match(/[a-z]/i)) as boolean;
}
function isString(value: ns): value is string {
    return typeof value === 'string';
}

// Invoke here
console.log(isInArray(['a', 'b', 'c'], 'a', 'b')); // -> true
console.log(summator(7, '15', '12')); // -> 34
console.log(getUnique(5, 5, 10, '7', '7', false, false, true)); // -> [ 5, 10, '7', false, true ]
console.log(reverseWords('s1tar3t 2 hellow')); //  ->  t1rat3s 2 wolleh
console.log(reverseWords('s1ta$%r3t 2 hel^low')); //  ->  t1ra$%t3s 2 wol^leh
console.log(reverseWords('s1tar3t 2   low5')); //  ->  t1rat3s 2   wol5
