export default function summator(...numbers: ns[]): number {
    return numbers.reduce(covertToNumberAndSum) as number;
}

function covertToNumberAndSum(previousValue, currentValue): number {
    return convertToNumber(previousValue) + convertToNumber(currentValue);
}

function convertToNumber(value: ns): number {
    if (isString(value)) {
        value = parseFloat(value);
    }
    return value;
}

function isString(value: ns): value is string {
    return typeof value === 'string';
}

type ns = number | string;


test();
function test() {
    console.log(summator(1, '10', 27, '2'));
}