export default function isInArray<T>(this: void, array: Array<T>, ...values: T[]): boolean {
    const isValueInArray = (value: T): boolean => array.includes(value);

    return values.every(isValueInArray);
}


test();

function test() {
    let obj = {};
    let arr = [1, '2', obj, false];

    console.log(isInArray(arr, 1, obj, '2'));
    console.log(isInArray(arr, true, '2'));
}


