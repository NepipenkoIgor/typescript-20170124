export default function getUnique<T>(...values: T[]): T[] {
    return values.reduce<T[]>(pushToArrayIfUnique, []);
}

function pushToArrayIfUnique<T>(arr: T[], value: T): T[] {
    if (!arr.includes(value)) {
        arr.push(value);
    }
    return arr;
}

test();
function test() {
    let obj = {};
    console.log(getUnique('3', 5, '3', 7, 7, obj, obj, false, false, true, 0, null, undefined, undefined, null));
}