// 1
function isInArray(subject: string[], ...params: string[]) : boolean {
    return params.every((item: string) => subject.indexOf(item) !== -1);
}

// 2
function summator(...params: any[]): number {
    let sum: number = 0;
    params = params.map(item => parseInt(item, 10));
    sum = params.reduce((pv: number, nv: number) => {
        return pv + nv;
    });
    return sum;
}

// 3
function getUnique(...params: number[]): number[] {
    let result: number[] = [],
        temp = {},
        length: number = params.length,
        key: string;

    for (var i = 0; i < length; ++i) {
        key = params[i].toString();
        if (temp.hasOwnProperty(key)) {
            continue;
        }
        result.push(params[i]);
        temp[params[i]] = 1;
    }
    return result;
}

// 4
function reverseWords(str: string) {
    let temp: string[] = str.split(" ");
    let result: string[] = [];

    for (let item of temp) {
        result.push(reverseWord(item));
    }
    return result.join(" ");
}

function reverseWord(str: string): string {
    var symbols: string[] = str.split("");

    for (let i = 0; i < symbols.length; i++) {
        if (!isLetter(symbols[i])) {
            symbols.splice(i, 1, null);
        }
    }
    // Remove nulls and reverse
    symbols = symbols.join("").split("");
    symbols.reverse();

    // Adding missing special symbols from original str
    for (let j = 0; j < str.length; j++) {
        if (!isLetter(str[j])) {
            symbols.splice(j, 0, str[j]);
        }
    }
    return symbols.join('');
}

function isLetter(str:string): boolean {
    let regExpMatch: RegExpMatchArray = str.match(/[a-z]/i);
    if (str.length === 1 && regExpMatch) {
        return true;
    }
    return false;
}

// Invoke here
console.log(isInArray(["a", "b", "c"], "a", "b")); // -> true
console.log(summator(7, "15", "12")); // -> 34
console.log(getUnique(5,4,3,5,1, 6, 10, 5, 4, 3, 2, 12, 25)); // -> [ 5, 4, 3, 1, 6, 10, 2, 12, 25 ]
console.log(reverseWords('s1tar3t 2 hellow')); //  ->  t1rat3s 2 wolleh
console.log(reverseWords('s1ta$%r3t 2 hel^low')); //  ->  t1ra$%t3s 2 wol^leh
console.log(reverseWords('s1tar3t 2   low5')); //  ->  t1rat3s 2   wol5
