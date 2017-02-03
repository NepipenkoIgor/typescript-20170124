let isInArray = (array: any[], ...args: any[]) => {
    for (let arg of args) {
        if (array.indexOf(arg) === -1) {
            return false;
        }
    }

    return true;
};

let arrayToCheck = [
    'abc',
    123,
    false
];

console.log(isInArray(arrayToCheck, 'abc', 123, false));