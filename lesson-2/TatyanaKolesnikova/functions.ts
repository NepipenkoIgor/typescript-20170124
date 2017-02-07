type ns = number | string;
type nsb = ns | boolean;

function isInArray(arr: nsb[], ...rest: nsb[]): boolean {
    for (let item of rest) {
        if (arr.indexOf(item) === -1) {
            return false;
        }
    }
    return true;
}


function summator(...numbers: ns[]): number {
    let res: number = 0;
    for (let num of numbers) {
        res += isNaN(+num) ? 0 : +num;
    }
    return res;
}


function getUnique(...arr: nsb[]): nsb[] {
    let res: nsb[] = [];
    for (let item of arr) {
        if (!isInArray(res, item)) {
            res.push(item);
        }
    }
    return res;
}


function isABC(str: string, pos: number): boolean {
    const code: number = str[pos].toLowerCase().charCodeAt(0);
    return code > 96 && code < 123;
}
function reverse(str: string): string {
    const arr: ReadonlyArray<string> = str.split(' ');
    let newArr: string[] = [];
    for (let item of arr) {
        let word: string = item;
        const size: number = Math.floor(word.length / 2);
        for (let i = 0; i < size; ++i) {
            const iFrom: number = i;
            const iTo: number = word.length - i - 1;
            if (isABC(word, iFrom) && isABC(word, iTo)) {
                word = word.slice(0, iFrom) + word[iTo] + word.slice(iFrom + 1, iTo) + word[iFrom] + word.slice(iTo + 1);
            }
        }
        newArr.push(word);
    }
    return newArr.join(' ');
}
